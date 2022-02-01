import os,binascii
from uuid import uuid4
from base64 import urlsafe_b64encode
from django.contrib.auth.models import User
from django.core.cache import cache
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action 
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import (
    RetrieveModelMixin,
)
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    AccountSerializer,
    AccountTokenObtainPairSerializer,
    RegisterAccountSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer
)
from .models import Account

class AccountView(GenericViewSet,
                  RetrieveModelMixin):
    """Account model viewset"""
    
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

    def get_permissions(self):
        if self.action == "create":
            return []
        return super().get_permissions()
    
    def get_serializer_class(self):
        if self.action == "create":
            return RegisterAccountSerializer

        return super().get_serializer_class()
    

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data,)
        serializer.is_valid(raise_exception=True)
        data = serializer.data

        verify_token = urlsafe_b64encode(os.urandom(40)).decode("utf-8")
        
        cache.add(verify_token, data, 3600)
        send_mail("Verification Link",verify_token,
                  "noreply@crypmo.com",[data["email"]])

        return Response(status=status.HTTP_202_ACCEPTED)
    
    @action(methods=["GET"], detail=True,
            permission_classes=[], lookup_url_kwarg="verify_token")
    def verify(self, request, verify_token, *args, **kwargs):
        data = cache.get(verify_token)
        if data:
            user = User.objects.create_user(data["email"],password=data["password"])
            account = Account.objects.create(user=user)
            cache.delete(verify_token)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["POST"], detail=False,
            permission_classes=[], serializer_class=ForgotPasswordSerializer)
    def forgot(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(username=email)

            reset_token = urlsafe_b64encode(os.urandom(40)).decode("utf-8")
            cache.add(reset_token, user.username, 3600)
            
            send_mail("Reset Password Link", reset_token,
                  "noreply@crypmo.com",[email])
        except User.DoesNotExist:
            pass

        return Response(status=status.HTTP_202_ACCEPTED)
    
    @action(methods=["POST"], detail=False,
            permission_classes=[], serializer_class=ResetPasswordSerializer)
    def reset(self, request, reset_token ,*args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        password = serializer.validated_data["password"]

        email = cache.get(reset_token)
        
        if email:
            user = User.objects.get(username=email)
            user.set_password(password)
            user.save()

            cache.delete(reset_token)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    
    @reset.mapping.get
    def check_token(self, request, reset_token, *args, **kwargs):
        email = cache.get(reset_token)
        if email:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

class AccountTokenObtainPairView(TokenObtainPairView):
    serializer_class = AccountTokenObtainPairSerializer

