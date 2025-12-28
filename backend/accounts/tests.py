from rest_framework.test import APITestCase
from .models import User
from django.urls import reverse
from rest_framework import status

# Create your tests here.
class UserViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username = 'somenewUser',
            password = 'somerandompassword',
            email = 'somenewuser@test.com'
        )

        self.url = reverse('user')

    def test_get_user_authenticated(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)
        self.assertEqual(response.data['email'], self.user.email)

    def test_get_user_unauthenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

