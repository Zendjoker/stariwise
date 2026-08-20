"""Send new-lead notifications to your phone via Discord webhook and/or email."""
import json
import logging
import urllib.request

from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


def _discord(text):
    url = getattr(settings, "DISCORD_WEBHOOK_URL", "")
    if not url:
        return
    try:
        data = json.dumps({"content": text[:1900]}).encode("utf-8")
        req = urllib.request.Request(
            url, data=data, headers={"Content-Type": "application/json"}
        )
        urllib.request.urlopen(req, timeout=6)
    except Exception:  # noqa: BLE001 - notifications must never break submissions
        logger.exception("Discord notification failed")


def _email(subject, text):
    admin_email = getattr(settings, "ADMIN_EMAIL", "")
    if not admin_email:
        return
    try:
        send_mail(
            subject,
            text,
            settings.DEFAULT_FROM_EMAIL,
            [admin_email],
            fail_silently=True,
        )
    except Exception:  # noqa: BLE001
        logger.exception("Email notification failed")


def notify(subject, text):
    _discord(f"**{subject}**\n{text}")
    _email(subject, text)
