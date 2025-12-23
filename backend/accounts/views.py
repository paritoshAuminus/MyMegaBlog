from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializer import UserSerializer
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET'])
def user(request, email, password):
    pass

@api_view(['POST'])
def login(request):
    pass

@api_view(['POST'])
def register(request):
    pass