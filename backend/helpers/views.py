import json
import logging

from django.conf import settings
from django.core.mail import send_mail
from django.http import Http404, JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import TaskRequest, TaskApplication
from leads.notify import notify
from accounts.auth import get_user, require_approved_helper

logger = logging.getLogger(__name__)

PAGE_SIZE = 20


def _client_ip(request):
    fwd = request.META.get("HTTP_X_FORWARDED_FOR")
    return fwd.split(",")[0].strip() if fwd else request.META.get("REMOTE_ADDR")


def _payload(request):
    try:
        return json.loads(request.body.decode("utf-8") or "{}")
    except (ValueError, UnicodeDecodeError):
        return {}


def _task_to_dict(task, include_contact=False):
    # Include poster profile picture if available
    poster_pic = None
    if task.poster_user:
        try:
            pic = task.poster_user.profile.profile_picture
            if pic:
                poster_pic = pic.url
        except Exception:
            pass

    d = {
        "id":           task.pk,
        "title":        task.title,
        "service_type": task.service_type,
        "service_label": task.get_service_type_display(),
        "description":  task.description,
        "location":     task.location,
        "date_needed":  task.date_needed,
        "duration_hrs": task.duration_hrs,
        "pay_type":     task.pay_type,
        "rate_offered": task.rate_offered,
        "helpers_needed": task.helpers_needed,
        "poster_name":  task.poster_name,
        "poster_pic":   poster_pic,
        "status":       task.status,
        "created_at":   task.created_at.isoformat(),
        "application_count": task.applications.count(),
    }
    if include_contact:
        d["poster_phone"] = task.poster_phone
        d["poster_email"] = task.poster_email
    return d


@method_decorator(csrf_exempt, name="dispatch")
class TaskListView(View):
    def get(self, request):
        qs = TaskRequest.objects.filter(status="open")
        service = request.GET.get("service")
        if service and service != "all":
            qs = qs.filter(service_type=service)
        tasks = [_task_to_dict(t) for t in qs[:PAGE_SIZE]]
        return JsonResponse({"tasks": tasks, "count": len(tasks)})

    def post(self, request):
        # Require login to post a task
        user, profile = get_user(request)
        data = _payload(request)
        title = (data.get("title") or "").strip()
        if not title:
            return JsonResponse({"ok": False, "error": "Title is required."}, status=400)

        # If logged in, use their profile info as defaults
        poster_name  = (data.get("poster_name") or (profile.display_name if profile else ""))[:120]
        poster_email = (data.get("poster_email") or (user.email if user else ""))[:254]
        poster_phone = (data.get("poster_phone") or (profile.phone if profile else ""))[:40]

        task = TaskRequest.objects.create(
            poster_user=user,
            title=title[:200],
            service_type=(data.get("service_type") or "other")[:40],
            description=(data.get("description") or "")[:3000],
            location=(data.get("location") or "")[:200],
            date_needed=(data.get("date_needed") or "")[:60],
            duration_hrs=(data.get("duration_hrs") or "")[:40],
            pay_type=(data.get("pay_type") or "hourly")[:10],
            rate_offered=(data.get("rate_offered") or "")[:100],
            helpers_needed=max(1, min(10, int(data.get("helpers_needed") or 1))),
            poster_name=poster_name,
            poster_email=poster_email,
            poster_phone=poster_phone,
            ip=_client_ip(request),
        )

        manage_url = f"https://gostairwise.com/need-helper/manage/{task.management_token}/"
        notify(
            "New helper task posted",
            f"**{task.title}** ({task.get_service_type_display()})\n"
            f"📍 {task.location} | 📅 {task.date_needed}\n"
            f"👤 {task.poster_name} | 📞 {task.poster_phone or '—'} | ✉️ {task.poster_email}\n"
            f"💬 {task.description[:300]}\n"
            f"🔑 Manage: {manage_url}",
        )

        # Email the management link to the poster
        admin_email = getattr(settings, "ADMIN_EMAIL", "")
        if task.poster_email:
            try:
                send_mail(
                    "Your task is live on Stairwise — manage it here",
                    f"Hi {task.poster_name},\n\n"
                    f"Your task \"{task.title}\" is now live.\n\n"
                    f"View and manage it here (keep this link private):\n{manage_url}\n\n"
                    f"We'll notify you by email when someone applies.\n\n"
                    f"— Stairwise\nhello@gostairwise.com | (415) 724-8720",
                    settings.DEFAULT_FROM_EMAIL,
                    [task.poster_email],
                    fail_silently=True,
                )
            except Exception:
                pass

        return JsonResponse({
            "ok": True,
            "id": task.pk,
            "manage_url": manage_url,
        })


@method_decorator(csrf_exempt, name="dispatch")
class TaskApplyView(View):
    def post(self, request, task_id):
        # Only approved helpers can apply
        user, profile = get_user(request)
        if not user:
            return JsonResponse({"ok": False, "error": "Login required.", "need_auth": True}, status=401)
        if not profile or profile.helper_status != "approved":
            return JsonResponse({"ok": False, "error": "You need approved helper status to apply.", "need_helper": True}, status=403)

        try:
            task = TaskRequest.objects.get(pk=task_id, status="open")
        except TaskRequest.DoesNotExist:
            return JsonResponse({"ok": False, "error": "Task not found or no longer open."}, status=404)

        data = _payload(request)
        # Default to profile info if logged in
        name  = (data.get("worker_name")  or profile.display_name)[:120]
        phone = (data.get("worker_phone") or profile.phone)[:40]
        email = (data.get("worker_email") or user.email)[:254]

        if not phone:
            return JsonResponse({"ok": False, "error": "Phone number is required."}, status=400)

        app = TaskApplication.objects.create(
            task=task,
            applicant=user,
            worker_name=name,
            worker_phone=phone,
            worker_email=email,
            message=(data.get("message") or "")[:1000],
            ip=_client_ip(request),
        )

        notify(
            "New application for a helper task",
            f"**{app.worker_name}** applied to: {task.title}\n"
            f"📞 {app.worker_phone}{(' | ✉️ ' + app.worker_email) if app.worker_email else ''}\n"
            f"Helper profile: {profile.helper_status} | {profile.location}\n"
            f"💬 {app.message or '—'}\n"
            f"Task poster: {task.poster_name} | {task.poster_phone or task.poster_email}",
        )

        # Email the task poster
        if task.poster_email:
            try:
                manage_url = f"https://gostairwise.com/need-helper/manage/{task.management_token}/"
                send_mail(
                    f"Someone applied to help with: {task.title}",
                    f"Hi {task.poster_name},\n\n"
                    f"{app.worker_name} wants to help with your task \"{task.title}\".\n\n"
                    f"Their contact:\n"
                    f"  Phone: {app.worker_phone}\n"
                    f"{('  Email: ' + app.worker_email + chr(10)) if app.worker_email else ''}"
                    f"\nMessage:\n{app.message or '(no message)'}\n\n"
                    f"Manage your task: {manage_url}\n\n"
                    f"— Stairwise\nhello@gostairwise.com",
                    settings.DEFAULT_FROM_EMAIL,
                    [task.poster_email],
                    fail_silently=True,
                )
            except Exception:
                pass

        return JsonResponse({"ok": True})


@method_decorator(csrf_exempt, name="dispatch")
class TaskManageView(View):
    """Token-gated view for task poster to manage their task."""

    def get(self, request, token):
        try:
            task = TaskRequest.objects.get(management_token=token)
        except TaskRequest.DoesNotExist:
            raise Http404()
        apps = [
            {
                "name": a.worker_name,
                "phone": a.worker_phone,
                "email": a.worker_email,
                "message": a.message,
                "applied_at": a.created_at.isoformat(),
            }
            for a in task.applications.all()
        ]
        return JsonResponse({"task": _task_to_dict(task, include_contact=True), "applications": apps})

    def post(self, request, token):
        try:
            task = TaskRequest.objects.get(management_token=token)
        except TaskRequest.DoesNotExist:
            raise Http404()
        data = _payload(request)
        action = data.get("action")
        if action == "close":
            task.status = "filled"
        elif action == "cancel":
            task.status = "cancelled"
        else:
            return JsonResponse({"ok": False, "error": "Unknown action."}, status=400)
        task.save()
        return JsonResponse({"ok": True, "status": task.status})
