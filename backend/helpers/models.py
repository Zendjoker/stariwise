import uuid

from django.contrib.auth.models import User
from django.db import models


class TaskRequest(models.Model):
    SERVICE_CHOICES = [
        ("moving",    "Moving Help"),
        ("lifting",   "Heavy Lifting"),
        ("assembly",  "Furniture Assembly"),
        ("cleaning",  "Cleaning"),
        ("junk",      "Junk Removal"),
        ("van",       "Van / Truck Needed"),
        ("other",     "Other"),
    ]
    STATUS_CHOICES = [
        ("open",      "Open"),
        ("filled",    "Filled"),
        ("cancelled", "Cancelled"),
    ]
    PAY_TYPE_CHOICES = [
        ("hourly", "Hourly"),
        ("fixed",  "Fixed price"),
    ]

    # Optional link to registered user (anonymous posting still allowed)
    poster_user  = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="posted_tasks")

    title        = models.CharField(max_length=200)
    service_type = models.CharField(max_length=40, choices=SERVICE_CHOICES)
    description  = models.TextField()
    location     = models.CharField(max_length=200)
    date_needed  = models.CharField(max_length=60)
    duration_hrs = models.CharField(max_length=40, blank=True)
    pay_type     = models.CharField(max_length=10, choices=PAY_TYPE_CHOICES, default="hourly")
    rate_offered = models.CharField(max_length=100, blank=True)
    helpers_needed = models.PositiveSmallIntegerField(default=1)

    poster_name  = models.CharField(max_length=120)
    poster_email = models.EmailField()
    poster_phone = models.CharField(max_length=40, blank=True)

    status           = models.CharField(max_length=20, choices=STATUS_CHOICES, default="open")
    management_token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    ip         = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.get_service_type_display()}) — {self.status}"


class TaskApplication(models.Model):
    task         = models.ForeignKey(TaskRequest, on_delete=models.CASCADE, related_name="applications")
    applicant    = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="applications")
    worker_name  = models.CharField(max_length=120)
    worker_phone = models.CharField(max_length=40)
    worker_email = models.EmailField(blank=True)
    message      = models.TextField(blank=True)
    ip           = models.GenericIPAddressField(null=True, blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.worker_name} → {self.task.title}"
