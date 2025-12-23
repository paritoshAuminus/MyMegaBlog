from django.urls import path
from . import views

urlpatterns = [
    path('blogs/', views.blogs),
    path('blogs/<int:pk>', views.blog),
    path('blogs/add/', views.add_blog),
    path('blogs/update/<int:pk>', views.update_blog),
    path('blogs/delete/<int:pk>', views.delete_blog),
]
