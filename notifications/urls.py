from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("user_notifications", views.user_notifications, name="user_notifications"),
    path("notifications_count", views.notifications_count, name="notifications_count"),
]