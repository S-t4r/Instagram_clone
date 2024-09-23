from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Message
from notifications.models import  Notification

@receiver(post_save, sender=Message)
def create_message_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.receiver,
            message=f"You have a new message by {instance.sender.username}!",
            username=instance.sender.username
        )