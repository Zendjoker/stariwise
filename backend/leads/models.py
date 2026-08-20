from django.db import models


class ContactRequest(models.Model):
    """A quote / contact request submitted from the website form."""

    STATUS_CHOICES = [
        ("new", "New"),
        ("contacted", "Contacted"),
        ("booked", "Booked"),
        ("closed", "Closed"),
    ]

    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=40, blank=True)
    email = models.EmailField(blank=True)
    preferred_date = models.CharField(max_length=40, blank=True)
    moving_from = models.CharField(max_length=200, blank=True)
    moving_to = models.CharField(max_length=200, blank=True)
    service = models.CharField(max_length=60, blank=True)
    notes = models.TextField(blank=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    ip = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.service or 'quote'}) — {self.created_at:%Y-%m-%d}"


class DiscountLead(models.Model):
    """An email captured by the first-service discount popup."""

    email = models.EmailField()
    source = models.CharField(max_length=60, blank=True)
    ip = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.email} — {self.created_at:%Y-%m-%d}"
