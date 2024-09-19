from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="comment"),
    path("remove", views.remove, name="remove"),
]