from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Comment
from notifications.models import Notification

@receiver(post_save, sender=Comment)
def create_comment_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.post.profile.user,
            message=f"{instance.user.username} commented on your post!",
            post=instance.post,
            username=instance.user.username
        )