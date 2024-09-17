from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("create_posts", views.create_posts, name="create_posts"),
    path("show_posts", views.show_posts, name="show_posts"),
    path("following", views.following, name="following"),
    path("edit", views.edit, name="edit"),
    path("remove", views.remove, name="remove"),
]