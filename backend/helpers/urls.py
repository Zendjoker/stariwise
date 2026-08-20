from django.urls import path
from . import views

urlpatterns = [
    path("tasks/",                views.TaskListView.as_view(),   name="tasks"),
    path("tasks/<int:task_id>/apply/", views.TaskApplyView.as_view(), name="task-apply"),
    path("tasks/manage/<uuid:token>/", views.TaskManageView.as_view(), name="task-manage"),
]
