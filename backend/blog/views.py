from rest_framework.response import Response
from rest_framework import status
from .models import Blog
from .serializer import BlogSerializer
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET'])
def blogs(request):
    blogs = Blog.objects.all()
    serializer = BlogSerializer(blogs, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def blog(request, pk):
    try:
        blog = Blog.objects.get(id=pk)
        serializer = BlogSerializer(blog)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Blog.DoesNotExist:
        return Response({'detail': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def add_blog(request):
    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response({'message': 'Blog created successfully.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, {'message': 'Failed to create new blog'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def update_blog(request, pk):
    try:
        blog = Blog.objects.get(id=pk)
    except Blog.DoesNotExist:
        return Response({'message': 'Blog not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = BlogSerializer(blog, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'data': serializer.data, 'message': 'Blog updated successfully.'}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_blog(request, pk):
    try:
        Blog.objects.get(id=pk).delete()
        return Response({'message': 'Blog deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Blog.DoesNotExist:
        return Response({'message': 'Unable to find the blog to delete.'}, status=status.HTTP_400_BAD_REQUEST)