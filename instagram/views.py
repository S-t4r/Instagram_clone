from django.contrib import messages
from django.http import JsonResponse

def get_messages(request):
    storage = messages.get_messages(request)
    response = [{"message": message.message, "level": message.level} for message in storage]
    return JsonResponse(response, safe=False)
