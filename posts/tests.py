from django.test import TestCase
from .models import Post
from users.models import Profile, User

# Create your tests here.

class PostCreationTest(TestCase):
    def setUp(self):
        user, created = User.objects.get_or_create(username='username', defaults={'password': 'password'})

        # Create or get a Profile instance linked to the User
        self.profile, created = Profile.objects.get_or_create(user=user, defaults={'bio': 'This is a bio.'})

    def test_create_posts(self):
        for i in range(10):
            Post.objects.create(
                profile=self.profile,
                title=f"Title {i}",
                caption=f"Caption {i}",
                post_image="path/to/image.jpg"
            )