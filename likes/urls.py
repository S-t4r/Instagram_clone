from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("status/<int:post_id>/", views.status, name="status"),
    path("comments_status/<int:comment_id>/", views.comments_status, name="comments_status"),
    path("comments/", views.comments, name="comments"),
]