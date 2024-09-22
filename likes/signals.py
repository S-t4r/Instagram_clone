from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Like, CommentLike
from notifications.models import Notification

@receiver(post_save, sender=Like)
def create_like_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.post.profile.user,
            message=f"{instance.user.username} liked your post!",
            post=instance.post,
            username=instance.user.username
        )

@receiver(post_save, sender=CommentLike)
def create_comment_like_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.comment.user,
            message=f"Your comment was liked by {instance.user.username}!",
            post=instance.comment.post,
            username=instance.user.username
        )