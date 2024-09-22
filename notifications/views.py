from django.http import JsonResponse
from .models import Notification

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        notifications = Notification.objects.filter(user=request.user)
        notifications.update(is_read=True)
        return JsonResponse({'success': 'All notifications are read.'}, status=200)
    else:
        return JsonResponse({'error': 'Not logged in!'}, status=403)


def user_notifications(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User not authenticated'}, status=401)
    
    notifications = Notification.objects.filter(user=request.user).order_by('-timestamp')
    notifications_list = [
        {
            'message': notification.message,
            'username': notification.username,
            'timestamp': notification.timestamp,
            'is_read': notification.is_read
        }
        for notification in notifications
    ]
    return JsonResponse({'notifications': notifications_list}, status=200)


def notifications_count(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User not authenticated'}, status=401)
    
    # Get the number of unread notifications
    unread_count = Notification.objects.filter(user=request.user, is_read=False).count()
    return JsonResponse({'unread_count': unread_count}, status=200)
