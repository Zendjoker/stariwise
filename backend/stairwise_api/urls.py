from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("leads.urls")),
    path("api/helpers/", include("helpers.urls")),
    path("api/auth/", include("accounts.urls")),
]
