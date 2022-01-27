import email
from django.core import validators
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Account

class AccountTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        

        return token

class AccountSerializer(serializers.ModelSerializer):
    username = serializers.EmailField(source="user.username")
    class Meta:
        model = Account
        fields = ["id","username","balance"]

class RegisterAccountSerializer(serializers.Serializer):
    email = serializers.EmailField(source="username",validators=[
                UniqueValidator(User.objects.all(),"This email address already exists")])

    password = serializers.CharField(min_length=8, validators = [
                RegexValidator(r"(?=.*[A-Z])","Password must contain at least one uppercase letter"),
                RegexValidator(r"(?=.*[0-9])","Password must contain at least one number")])
    
class ResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=8, validators = [
                RegexValidator(r"(?=.*[A-Z])","Password must contain at least one uppercase letter"),
                RegexValidator(r"(?=.*[0-9])","Password must contain at least one number")])