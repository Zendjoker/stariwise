from django.urls import path

from . import views

urlpatterns = [
    path("api/contact/", views.ContactView.as_view(), name="contact"),
    path("api/lead/", views.LeadView.as_view(), name="lead"),
    path("dashboard/<str:token>/", views.dashboard, name="dashboard"),
]
