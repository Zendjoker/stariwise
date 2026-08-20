import json

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils import timezone
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .auth import get_user, require_auth
from .models import AuthToken, UserProfile


def _payload(request):
    try:
        return json.loads(request.body.decode("utf-8") or "{}")
    except (ValueError, UnicodeDecodeError):
        return {}


def _profile_dict(user, profile):
    pic = profile.profile_picture.url if profile.profile_picture else None
    return {
        "id":              user.id,
        "username":        user.username,
        "email":           user.email,
        "first_name":      user.first_name,
        "last_name":       user.last_name,
        "display_name":    profile.display_name,
        "bio":             profile.bio,
        "location":        profile.location,
        "phone":           profile.phone,
        "profile_picture": pic,
        "helper_status":   profile.helper_status,
        "services_offered": profile.services_offered,
        "experience":      profile.experience,
        "is_helper":       profile.is_approved_helper,
    }


@method_decorator(csrf_exempt, name="dispatch")
class RegisterView(View):
    def post(self, request):
        data = _payload(request)
        email    = (data.get("email") or "").strip().lower()
        password = (data.get("password") or "").strip()
        name     = (data.get("name") or "").strip()

        if not email or not password:
            return JsonResponse({"ok": False, "error": "Email and password required."}, status=400)
        if len(password) < 8:
            return JsonResponse({"ok": False, "error": "Password must be at least 8 characters."}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({"ok": False, "error": "An account with this email already exists."}, status=400)

        username = email.split("@")[0]
        # Ensure unique username
        base, n = username, 1
        while User.objects.filter(username=username).exists():
            username = f"{base}{n}"; n += 1

        first, *rest = (name.split() + [""])[:2]
        user = User.objects.create_user(
            username=username, email=email, password=password,
            first_name=first, last_name=" ".join(rest)
        )
        profile = UserProfile.objects.create(
            user=user,
            location=(data.get("location") or "")[:200],
            phone=(data.get("phone") or "")[:40],
        )
        token = AuthToken.objects.create(user=user)
        return JsonResponse({"ok": True, "token": token.key, "user": _profile_dict(user, profile)})


@method_decorator(csrf_exempt, name="dispatch")
class LoginView(View):
    def post(self, request):
        data  = _payload(request)
        email = (data.get("email") or "").strip().lower()
        pwd   = (data.get("password") or "")
        # allow username or email
        user = User.objects.filter(email=email).first()
        if user and user.check_password(pwd):
            pass  # ok
        else:
            user = authenticate(request, username=data.get("email", ""), password=pwd)
        if not user:
            return JsonResponse({"ok": False, "error": "Invalid email or password."}, status=401)
        profile, _ = UserProfile.objects.get_or_create(user=user)
        token = AuthToken.objects.create(user=user)
        return JsonResponse({"ok": True, "token": token.key, "user": _profile_dict(user, profile)})


@method_decorator(csrf_exempt, name="dispatch")
class MeView(View):
    def get(self, request):
        user, profile = get_user(request)
        if not user:
            return JsonResponse({"ok": False, "error": "Not authenticated."}, status=401)
        return JsonResponse({"ok": True, "user": _profile_dict(user, profile)})

    def put(self, request):
        user, profile = get_user(request)
        if not user:
            return JsonResponse({"ok": False, "error": "Not authenticated."}, status=401)

        # Profile picture (multipart)
        if request.content_type and "multipart" in request.content_type:
            data = request.POST
            if "profile_picture" in request.FILES:
                profile.profile_picture = request.FILES["profile_picture"]
        else:
            data = _payload(request)

        if "first_name" in data:
            user.first_name = str(data["first_name"])[:150]
        if "last_name" in data:
            user.last_name  = str(data["last_name"])[:150]
        user.save()

        for field in ("bio", "location", "phone", "experience"):
            if field in data:
                setattr(profile, field, str(data[field])[:3000])
        if "services_offered" in data:
            v = data["services_offered"]
            profile.services_offered = v if isinstance(v, list) else json.loads(v)
        profile.save()
        return JsonResponse({"ok": True, "user": _profile_dict(user, profile)})


@method_decorator(csrf_exempt, name="dispatch")
class HelperApplyView(View):
    """Apply to become a helper, or re-submit after rejection."""

    def post(self, request):
        user, profile = get_user(request)
        if not user:
            return JsonResponse({"ok": False, "error": "Login required."}, status=401)
        if profile.helper_status == "approved":
            return JsonResponse({"ok": False, "error": "You are already an approved helper."}, status=400)

        data = _payload(request)
        bio  = (data.get("bio") or "").strip()
        exp  = (data.get("experience") or "").strip()
        svcs = data.get("services_offered") or []
        loc  = (data.get("location") or profile.location or "").strip()
        ph   = (data.get("phone") or profile.phone or "").strip()

        if not bio or not svcs:
            return JsonResponse({"ok": False, "error": "Bio and at least one service are required."}, status=400)

        profile.bio              = bio[:3000]
        profile.experience       = exp[:3000]
        profile.services_offered = svcs
        profile.location         = loc[:200]
        profile.phone            = ph[:40]
        profile.helper_status    = "pending"
        profile.helper_applied_at = timezone.now()
        profile.save()

        from leads.notify import notify
        notify(
            "New helper application",
            f"**{profile.display_name}** ({user.email})\n"
            f"📍 {profile.location} | 📞 {profile.phone}\n"
            f"Services: {', '.join(svcs)}\n"
            f"Bio: {bio[:300]}\n"
            f"Approve in Django admin: https://gostairwise.com/sw-admin/accounts/userprofile/",
        )
        return JsonResponse({"ok": True, "helper_status": "pending"})


@method_decorator(csrf_exempt, name="dispatch")
class LogoutView(View):
    def post(self, request):
        user, _ = get_user(request)
        if user:
            from accounts.auth import get_token_from_request
            key = get_token_from_request(request)
            AuthToken.objects.filter(key=key).delete()
        return JsonResponse({"ok": True})
