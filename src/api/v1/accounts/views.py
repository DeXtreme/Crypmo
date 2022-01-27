from uuid import uuid4
from base64 import urlsafe_b64encode
from django.contrib.auth.models import User
from django.core.cache import cache
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action, authentication_classes, permission_classes 
from rest_framework.mixins import (
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from .models import Account
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    AccountSerializer,
    AccountTokenObtainPairSerializer,
    RegisterAccountSerializer,
    ResetEmailSerializer,
    ResetPasswordSerializer
)

class AccountView(GenericViewSet,
                  CreateModelMixin,
                  RetrieveModelMixin):
    
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.action == "create":
            return []
        return super().get_permissions()
    
    def get_serializer_class(self):
        if self.action == "create":
            return RegisterAccountSerializer

        return super().get_serializer_class()
    
    def get_object(self):
        return self.request.user.account


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data,)
        serializer.is_valid(raise_exception=True)

        data = serializer.data

        verify_id = urlsafe_b64encode(uuid4().bytes).decode("utf-8")
        
        cache.add(verify_id, data, 3600)
        send_mail("Verification Link",verify_id,
                  "noreply@crypmo.com",[data["email"]])

        headers = self.get_success_headers(serializer.data)
        return Response(headers=headers)
    
    @action(methods=["GET"], 
            detail=True,
            permission_classes=[])
    def verify(self, request, verify_id, *args, **kwargs):
        data = cache.get(verify_id)

        if data:
            user = User.objects.create_user(data["email"],password=data["password"])
            account = Account.objects.create(user=user)
            cache.delete(verify_id)
            #TODO: add response message
            return Response(status=status.HTTP_201_CREATED)
        else:
            #TODO: add response message
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["POST"],
            detail=False,
            permission_classes=[],
            authentication_classes=[],
            serializer_class=ResetEmailSerializer)
    def reset(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(username=email)

            reset_token = urlsafe_b64encode(uuid4().bytes).decode("utf-8")
            cache.add(reset_token, user.username, 3600)
            
            send_mail("Reset Password Link", reset_token,
                  "noreply@crypmo.com",[email])
        except User.DoesNotExist:
            pass

        return Response(status=status.HTTP_200_OK)
    
    @action(methods=["POST"],
            detail=False,
            permission_classes=[],
            authentication_classes=[],
            serializer_class=ResetPasswordSerializer)
    def reset_token(self, request, reset_token ,*args, **kwargs):
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



        



    

    

class AccountTokenObtainPairView(TokenObtainPairView):
    serializer_class = AccountTokenObtainPairSerializer

