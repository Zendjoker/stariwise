from django.contrib import admin
from .models import AuthToken, UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display  = ("display_name", "user", "helper_status", "location", "phone", "created_at")
    list_filter   = ("helper_status",)
    list_editable = ("helper_status",)
    search_fields = ("user__username", "user__email", "user__first_name", "location")
    readonly_fields = ("created_at", "helper_applied_at")


@admin.register(AuthToken)
class AuthTokenAdmin(admin.ModelAdmin):
    list_display = ("user", "key", "created_at", "last_used")
    search_fields = ("user__username",)
    readonly_fields = ("key", "created_at", "last_used")
