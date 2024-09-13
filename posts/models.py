from django.db import models
from users.models import Profile
import os
# Create your models here.

class Post(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, default=3)
    caption = models.TextField(max_length=500)
    post_image = models.ImageField(upload_to="posts/")
    timestamp = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
        if self.post_image:
            if os.path.isfile(self.post_image.path):
                os.remove(self.post_image.path)
        super().delete(*args, **kwargs)