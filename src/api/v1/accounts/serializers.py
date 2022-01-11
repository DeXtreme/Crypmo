from django.core import validators
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Account

class AccountTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["id"] = user.account.id

        return token

class AccountSerializer(serializers.ModelSerializer):
    username = serializers.EmailField(source="user.username")
    class Meta:
        model = Account
        fields = ["id","username","balance"]

class RegisterAccountSerializer(serializers.Serializer):
    email = serializers.EmailField(validators=[
                UniqueValidator(User.objects.all())])
    password = serializers.RegexField(r"(?=.*[A-Z])(?=.*[0-9])",min_length=8)