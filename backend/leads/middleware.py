"""Lightweight CORS for the public API endpoints only."""
from django.conf import settings


class SimpleCorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.allowed = set(getattr(settings, "CORS_ALLOWED_ORIGINS", []))

    def __call__(self, request):
        origin = request.headers.get("Origin")

        if request.method == "OPTIONS" and origin is not None:
            from django.http import HttpResponse

            response = HttpResponse(status=204)
        else:
            response = self.get_response(request)

        if origin and (origin in self.allowed or "*" in self.allowed):
            response["Access-Control-Allow-Origin"] = origin
            response["Vary"] = "Origin"
            response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type"
            response["Access-Control-Max-Age"] = "86400"

        return response
