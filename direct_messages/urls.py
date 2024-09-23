from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("get_chat_messages/<str:username>", views.get_chat_messages, name="get_chat_messages"),
    path("send_messages", views.send_messages, name="send_messages"),
]