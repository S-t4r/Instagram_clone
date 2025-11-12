from django.core.paginator import Paginator
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Chat, Message

from users.models import User
# Create your views here.
def index(request):
    """A list of chats"""
    chats = Chat.objects.filter(participants=request.user).order_by('-timestamp')
    # Show 10 chats per page
    paginator = Paginator(chats, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    chat_data = []
    for chat in page_obj:
        other_user = chat.participants.exclude(id=request.user.id).first()
        last_message = chat.messages.order_by('-timestamp').first()
        if other_user and last_message:
            chat_data.append({
                'id': chat.id,
                'timestamp': last_message.timestamp.isoformat(),
                'other_user': other_user.username,
                'last_message': last_message.text
            })

    return JsonResponse({
        'chats': chat_data,
        'has_next': page_obj.has_next(),
        'has_previous': page_obj.has_previous(),
        'num_pages': paginator.num_pages,
        'current_page': page_obj.number,
    })


def get_chat_messages(request, username):
    user = request.user
    other_user = get_object_or_404(User, username=username)
    chat = Chat.objects.filter(participants=user).filter(participants=other_user).first()
    if not chat:
        return JsonResponse({'status': 'no_chat', 'error': 'Chat does not exist yet'}, status=200)
    
    messages = Message.objects.filter(chat=chat).order_by('-timestamp')
    
    # Show 10 messages per page
    paginator = Paginator(messages, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    serialized_messages = [message.serialize() for message in page_obj]
    return JsonResponse({
        'messages': serialized_messages,
        'has_next': page_obj.has_next(),
        'has_previous': page_obj.has_previous(),
        'num_pages': paginator.num_pages,
        'current_page': page_obj.number,
    })


def send_messages(request):
    """Handle sending messages between users"""
    if request.method == 'POST':
        message_text = request.POST.get('message')
        receiver_username = request.POST.get('receiver')
        sender = request.user

        try:
            receiver = get_object_or_404(User, username=receiver_username)
            
            # Check if there is an chat instance by these users
            chat = Chat.objects.filter(participants=sender).filter(participants=receiver).distinct().first()

            # If no chat instance then create one
            if not chat:
                chat = Chat.objects.create()
                chat.participants.add(sender, receiver)
            # Save the message
            new_message = Message(chat=chat, sender=sender, receiver=receiver, text=message_text)
            new_message.save()
            return JsonResponse({'status': 'success', 'message': 'Message sent successfully'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'{e}'})