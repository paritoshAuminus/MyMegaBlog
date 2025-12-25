from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializer import UserSerializer
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

# GET - Get one user
@api_view(['GET'])
def user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)

# POST - Register
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response(
            {'message': 'Username, email and password are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {'message': 'Username already exists.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {'message': 'Email already exists.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)