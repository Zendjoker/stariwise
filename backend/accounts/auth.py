"""Token authentication helpers shared across apps."""
from functools import wraps

from django.http import JsonResponse

from .models import AuthToken, UserProfile


def get_token_from_request(request):
    header = request.META.get("HTTP_AUTHORIZATION", "")
    if header.startswith("Bearer "):
        return header[7:].strip()
    return None


def get_user(request):
    """Return (user, profile) or (None, None)."""
    key = get_token_from_request(request)
    if not key:
        return None, None
    try:
        token = AuthToken.objects.select_related("user__profile").get(key=key)
        token.save()  # bumps last_used via auto_now
        profile, _ = UserProfile.objects.get_or_create(user=token.user)
        return token.user, profile
    except AuthToken.DoesNotExist:
        return None, None


def require_auth(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        user, profile = get_user(request)
        if not user:
            return JsonResponse({"ok": False, "error": "Authentication required."}, status=401)
        request.auth_user = user
        request.auth_profile = profile
        return view_func(request, *args, **kwargs)
    return wrapper


def require_approved_helper(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        user, profile = get_user(request)
        if not user:
            return JsonResponse({"ok": False, "error": "Authentication required."}, status=401)
        if not profile or profile.helper_status != "approved":
            return JsonResponse({"ok": False, "error": "Approved helper status required."}, status=403)
        request.auth_user = user
        request.auth_profile = profile
        return view_func(request, *args, **kwargs)
    return wrapper
