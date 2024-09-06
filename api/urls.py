from django.urls import path
from .views import get_user_data, get_messages, send_csrf

urlpatterns = [
    path('get_user_data', get_user_data, name='get_user_data'),
    path('get_messages', get_messages, name='get_messages'),
    path('send_csrf', send_csrf, name='csrfToken')
]