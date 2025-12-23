from django.db import models
from django.conf import settings
from accounts.models import User

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=50)    
    content = models.TextField()
    author = models.ForeignKey(User, verbose_name=("author"), related_name='blogs', on_delete=models.CASCADE)

    class Meta:
        verbose_name = ("Blog")
        verbose_name_plural = ("Blogs")

    def __str__(self):
        return self.title
