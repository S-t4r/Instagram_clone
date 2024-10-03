from django.urls import path
from .consumers import YourConsumer

websocket_urlpatterns = [
    path("ws/notifications/", YourConsumer.as_asgi()),
]