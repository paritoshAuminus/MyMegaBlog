from rest_framework.response import Response
from rest_framework import status
from .models import Blog
from rest_framework.permissions import AllowAny
from .serializer import BlogSerializer
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404

# GET [AllowAny] - get all the blogs 
@api_view(['GET'])
@permission_classes([AllowAny])
def blogs(request):
    blogs = Blog.objects.all()
    serializer = BlogSerializer(blogs, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

# GET [AllowAny] - get one blog
@api_view(['GET'])
@permission_classes([AllowAny])
def blog(request, pk):
    blog = get_object_or_404(Blog, id=pk)
    serializer = BlogSerializer(blog)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
# POST - Create/add a blog (authorised user)
@api_view(['POST'])
def add_blog(request):
    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response({'message': 'Blog created successfully.', 'data': serializer.data}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, {'message': 'Failed to create new blog'}, status=status.HTTP_400_BAD_REQUEST)

# PATCH - Update a blog (authorised user)
@api_view(['PATCH'])
def update_blog(request, pk):
    blog = get_object_or_404(Blog, id=pk)   

    if blog.author != request.user:
        return Response({'message': "You don't have permissions to edit this blog."}, status=status.HTTP_403_FORBIDDEN)

    serializer = BlogSerializer(blog, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'data': serializer.data, 'message': 'Blog updated successfully.'}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE - Delete a blog (authorised user)
@api_view(['DELETE'])
def delete_blog(request, pk):
    blog = get_object_or_404(Blog, id=pk)

    if blog.author != request.user:
        return Response({'message': "You don't have permission to delete this blog."}, status=status.HTTP_403_FORBIDDEN)

    blog.delete()
    return Response({'message': 'Blog deleted successfully'}, status=status.HTTP_204_NO_CONTENT)