from django.contrib import admin

from .models import ContactRequest, DiscountLead


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ("name", "service", "phone", "email", "status", "created_at")
    list_filter = ("status", "service", "created_at")
    search_fields = ("name", "phone", "email", "moving_from", "moving_to", "notes")
    list_editable = ("status",)
    readonly_fields = ("ip", "created_at")
    date_hierarchy = "created_at"


@admin.register(DiscountLead)
class DiscountLeadAdmin(admin.ModelAdmin):
    list_display = ("email", "source", "created_at")
    list_filter = ("source", "created_at")
    search_fields = ("email",)
    readonly_fields = ("ip", "created_at")
    date_hierarchy = "created_at"
