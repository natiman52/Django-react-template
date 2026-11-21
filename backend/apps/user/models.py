from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    class Status(models.TextChoices):
        OWNER = 'owner',"Owner"
        WORKER = "worker", "Worker"
    status = models.CharField(choices=Status.choices,max_length=200,default=Status.WORKER)

    def __str__(self):
        return self.username
