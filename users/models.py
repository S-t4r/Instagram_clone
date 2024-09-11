from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class User(User):
    pass

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True, null=True)
    following = models.ManyToManyField("self", symmetrical=False, related_name="followers", blank=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)

    def __str__(self):
        return self.user.username