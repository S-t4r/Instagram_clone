from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.contrib import messages

def get_user_data(request):
    if request.user.is_authenticated:
        return JsonResponse({"username": request.user.username})
    return JsonResponse({"username": None})

def get_messages(request):
    storage = messages.get_messages(request)
    response = [{"message": message.message, "level": message.level} for message in storage]
    return JsonResponse(response, safe=False)

def send_csrf(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})