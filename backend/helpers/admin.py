from django.contrib import admin
from .models import TaskRequest, TaskApplication


class ApplicationInline(admin.TabularInline):
    model = TaskApplication
    extra = 0
    readonly_fields = ("worker_name", "worker_phone", "worker_email", "message", "ip", "created_at")


@admin.register(TaskRequest)
class TaskRequestAdmin(admin.ModelAdmin):
    list_display  = ("title", "service_type", "location", "date_needed", "helpers_needed", "status", "created_at")
    list_filter   = ("status", "service_type", "created_at")
    search_fields = ("title", "description", "location", "poster_name", "poster_email")
    list_editable = ("status",)
    readonly_fields = ("management_token", "ip", "created_at")
    inlines = [ApplicationInline]


@admin.register(TaskApplication)
class TaskApplicationAdmin(admin.ModelAdmin):
    list_display  = ("worker_name", "worker_phone", "task", "created_at")
    search_fields = ("worker_name", "worker_phone", "worker_email")
    readonly_fields = ("ip", "created_at")
