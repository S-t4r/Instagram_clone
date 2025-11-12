from django.test import Client, TestCase
from .models import User
from django.urls import reverse

# Create your tests here.

class UserCreationTest(TestCase):
    def test_create_users(self):
        for i in range(10):
            User.objects.create_user(username=f'user{i}', password='1234')
        self.assertEqual(User.objects.count(), 10)

class AdminUserCreationTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin_user = User.objects.create_superuser(username='admin', password='password')
        self.client.login(username='admin', password='password')

    def test_create_users_from_admin(self):
        for i in range(10):
            response = self.client.post(reverse('admin:auth_user_add'), {
                'username': f'user{i}',
                'password1': 'password',
                'password2': 'password',
                'email': f'user{i}@example.com',
                'first_name': f'First{i}',
                'last_name': f'Last{i}',
            })
            self.assertEqual(response.status_code, 302)  # Check for a redirect after successful creation
        self.assertEqual(User.objects.count(), 11)  # 10 new users + 1 admin
