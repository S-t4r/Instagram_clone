from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class User(User):
    following = models.ManyToManyField("self", symmetrical=False, related_name="followers", blank=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)