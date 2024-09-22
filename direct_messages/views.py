from django.http import JsonResponse

from .models import Message
# Create your views here.
def index(request):
    messages = Message.objects.all()
    serialized_messages = [message.serialize() for message in messages]
    return JsonResponse(serialized_messages, safe=False)