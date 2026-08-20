import json

from django.conf import settings
from django.http import Http404, JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from .models import ContactRequest, DiscountLead
from .notify import notify


def _client_ip(request):
    fwd = request.META.get("HTTP_X_FORWARDED_FOR")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


def _payload(request):
    try:
        return json.loads(request.body.decode("utf-8") or "{}")
    except (ValueError, UnicodeDecodeError):
        return {}


@method_decorator(csrf_exempt, name="dispatch")
class ContactView(View):
    def post(self, request):
        data = _payload(request)
        name = (data.get("name") or "").strip()
        if not name:
            return JsonResponse({"ok": False, "error": "Name is required."}, status=400)

        obj = ContactRequest.objects.create(
            name=name[:120],
            phone=(data.get("phone") or "")[:40],
            email=(data.get("email") or "")[:254],
            preferred_date=(data.get("date") or "")[:40],
            moving_from=(data.get("moving_from") or "")[:200],
            moving_to=(data.get("moving_to") or "")[:200],
            service=(data.get("service") or "")[:60],
            notes=(data.get("notes") or "")[:5000],
            ip=_client_ip(request),
        )
        notify(
            "New quote request",
            f"{obj.name}\nService: {obj.service or '—'}\n"
            f"Phone: {obj.phone or '—'}\nEmail: {obj.email or '—'}\n"
            f"From: {obj.moving_from or '—'} → To: {obj.moving_to or '—'}\n"
            f"Date: {obj.preferred_date or '—'}\nNotes: {obj.notes or '—'}",
        )
        return JsonResponse({"ok": True})


@method_decorator(csrf_exempt, name="dispatch")
class LeadView(View):
    def post(self, request):
        data = _payload(request)
        email = (data.get("email") or "").strip()
        if not email or "@" not in email:
            return JsonResponse({"ok": False, "error": "Valid email required."}, status=400)

        obj = DiscountLead.objects.create(
            email=email[:254],
            source=(data.get("source") or "")[:60],
            ip=_client_ip(request),
        )
        notify("New discount signup", f"{obj.email}\nSource: {obj.source or '—'}")
        return JsonResponse({"ok": True})


def dashboard(request, token):
    """Secret, token-gated dashboard so the owner can view leads on their phone."""
    expected = getattr(settings, "SECRET_DASHBOARD_TOKEN", "")
    if not expected or token != expected:
        raise Http404()

    contacts = ContactRequest.objects.all()[:200]
    leads = DiscountLead.objects.all()[:200]
    context = {
        "contacts": contacts,
        "leads": leads,
        "contact_count": ContactRequest.objects.count(),
        "lead_count": DiscountLead.objects.count(),
        "new_count": ContactRequest.objects.filter(status="new").count(),
        "token": token,
    }
    return render(request, "leads/dashboard.html", context)
