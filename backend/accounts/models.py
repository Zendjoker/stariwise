import secrets

from django.contrib.auth.models import User
from django.db import models


def _token():
    return secrets.token_urlsafe(48)


class AuthToken(models.Model):
    user  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="auth_tokens")
    key   = models.CharField(max_length=80, unique=True, default=_token)
    created_at = models.DateTimeField(auto_now_add=True)
    last_used  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} — {self.key[:12]}…"


class UserProfile(models.Model):
    HELPER_STATUS = [
        ("none",     "Not applied"),
        ("pending",  "Pending review"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]
    SERVICE_CHOICES = [
        ("moving",   "Moving Help"),
        ("lifting",  "Heavy Lifting"),
        ("assembly", "Furniture Assembly"),
        ("cleaning", "Cleaning"),
        ("junk",     "Junk Removal"),
        ("van",      "Van / Truck"),
        ("other",    "Other"),
    ]

    user            = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    bio             = models.TextField(blank=True)
    location        = models.CharField(max_length=200, blank=True)
    phone           = models.CharField(max_length=40, blank=True)
    profile_picture = models.ImageField(upload_to="profiles/", blank=True, null=True)
    helper_status   = models.CharField(max_length=20, choices=HELPER_STATUS, default="none")
    services_offered = models.JSONField(default=list, blank=True)
    experience      = models.TextField(blank=True)
    helper_applied_at = models.DateTimeField(null=True, blank=True)
    created_at      = models.DateTimeField(auto_now_add=True)

    @property
    def is_approved_helper(self):
        return self.helper_status == "approved"

    @property
    def display_name(self):
        full = self.user.get_full_name()
        return full if full else self.user.username

    def __str__(self):
        return f"{self.display_name} ({self.helper_status})"
