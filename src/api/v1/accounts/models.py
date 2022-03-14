from uuid import uuid4
from django.contrib.auth.models import User
from django.db import models


class Account(models.Model):
    """User Account model
    
    Attributes
    ----------
    user: django.contrib.auth.models.User
        User object associated with the account
    id: UUID
        Account Id
    """
    
    user = models.OneToOneField(User,on_delete=models.CASCADE,
                                related_name="account")
    id = models.UUIDField(default=uuid4, primary_key=True)
    
    def __str__(self):
        return f"{self.user.username}"