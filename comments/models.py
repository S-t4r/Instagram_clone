from django.db import models
from posts.models import Post
from users.models import  User

# Create your models here.

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=500)
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            'id': self.pk,
            'post': self.post.pk,
            'user': self.user.username,
            'profile_image': self.user.profile.profile_image.url,
            'content': self.content,
            'timestamp': self.timestamp.isoformat(),
        }
