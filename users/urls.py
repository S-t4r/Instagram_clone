from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("register", views.register, name="register"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("follow", views.follow, name="follow"),
    path("<str:username>/", views.profile, name="profile"),
    path("<username>/edit/", views.edit, name="edit"),
]