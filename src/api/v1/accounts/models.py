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
    balance: float
        The fiat balance of the account
    """
    
    user = models.OneToOneField(User,on_delete=models.CASCADE,
                                related_name="account")
    id = models.UUIDField(default=uuid4, primary_key=True)
    balance = models.DecimalField(max_digits=22,
                                  default=0,
                                  decimal_places=2)
    
    def __str__(self):
        return f"{self.user.username}"