import logging
from django.db.models.signals import post_save
from django.dispatch import receiver
from notifications.models import Notification
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

logger = logging.getLogger(__name__)
channel_layer = get_channel_layer()

@receiver(post_save, sender=Notification)
def send_notification(sender, instance, created, **kwargs):
    if created:
        logger.info(f"Notification created for user_{instance.user.id}")
        async_to_sync(channel_layer.group_send)(
            f"user_{instance.user.id}",
            {
                "type": "notification.message",
                "message": {
                    "unread_count": Notification.objects.filter(user=instance.user, is_read=False).count()
                }
            }
        )