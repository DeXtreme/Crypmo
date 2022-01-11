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
    RegisterAccountSerializer
)

class AccountView(GenericViewSet,
                  CreateModelMixin,
                  RetrieveModelMixin):
    
    serializer = AccountSerializer

    def get_permissions(self):
        if self.action == "create" or self.action == "verify":
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

        data = serializer.validated_data

        verify_id = urlsafe_b64encode(uuid4().bytes).decode("utf-8")
        print(verify_id, flush=True)
        
        cache.add(verify_id, data, 3600)
        send_mail("Verification Link",verify_id,
                  "noreply@crypmo.com",[data["email"]])

        headers = self.get_success_headers(serializer.data)
        return Response(headers=headers)
    
    @action(methods=["GET"], detail=True)
    def verify(self, request, verify_id, *args, **kwargs):
        data = cache.get(verify_id)

        if data:
            user = User.objects.create_user(data["email"],password=data["password"])
            account = Account.objects.create(user=user)

            #TODO: add response message
            return Response(status=status.HTTP_201_CREATED)
        else:
            #TODO: add response message
            return Response(status=status.HTTP_400_BAD_REQUEST)

    

class AccountTokenObtainPairView(TokenObtainPairView):
    serializer_class = AccountTokenObtainPairSerializer

