from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    caption = models.TextField(max_length=500)
    post_image = models.ImageField(upload_to="posts/")
    timestamp = models.DateTimeField(auto_now_add=True)