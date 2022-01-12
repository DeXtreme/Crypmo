from django import test
from django.test.testcases import TestCase
from django.core import mail
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.test import APITestCase
from rest_framework.exceptions import ValidationError
from rest_framework import status

from .models import Account
from .serializers import (
    AccountSerializer,
    RegisterAccountSerializer
)

class AccountSerializerTestCase(TestCase):

    @classmethod
    def setUpTestData(cls) -> None:
        user = User.objects.create_user("testuser@test.com",
                                        password="test")
        cls.test_account = Account.objects.create(user=user)

    def test_account_serializer(self):
        """Test that the Account serializer has the correct
           structure"""

        serializer = AccountSerializer(self.test_account)
        data = serializer.data

        self.assertIn("id", data)
        self.assertEqual(data["id"], str(self.test_account.id))
        self.assertIn("username", data)
        self.assertEqual(data["username"], self.test_account.user.username)
        self.assertIn("balance", data)
        self.assertEqual(float(data["balance"]), self.test_account.balance)
    
class RegisterSerializerTestCase(TestCase):

    @classmethod
    def setUpTestData(cls) -> None:
        user = User.objects.create_user("testuser@test.com",
                                        password="test")
        cls.test_account = Account.objects.create(user=user)

    def test_valid_data(self):
        """ Test the registeration serializer 
            validation on valid data"""
    
        data = {"email": "testuser@gmail.com",
                "password": "Testuser1"}

        serializer = RegisterAccountSerializer(data=data)       
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError:
            self.fail()
    
    def test_invalid_email(self):
        """ Test the registeration serializer 
            validation on invalid emails"""
    
        data = {"email": "testusergmail.com",
                "password": "Testuser1"}

        serializer = RegisterAccountSerializer(data=data)       
        self.assertRaises(ValidationError, 
                          lambda: serializer.is_valid(raise_exception=True))
    
    def test_existing_email(self):
        """ Test the registeration serializer 
            validation on already existing emails"""
        
        data = {"email": self.test_account.user.username,
                "password": "Testuser1"}
        
        serializer = RegisterAccountSerializer(data=data)  
        self.assertRaises(ValidationError, 
            lambda: serializer.is_valid(raise_exception=True))


    def test_invalid_passwords(self):
        """ Test the registeration serializer 
            validation on invalid passwords"""
        
        def do_test(data):
            serializer = RegisterAccountSerializer(data=data)   
            self.assertRaises(ValidationError, 
                lambda: serializer.is_valid(raise_exception=True))
    
        # Password contains no uppercase letters
        data = {"email": "testuser@gmail.com",
                "password": "testuser1"}
        do_test(data)
            
        # Password contains no numbers
        data = {"email": "testuser@gmail.com",
                "password": "Testuser"}
        do_test(data)

        # Password less than 8 characters
        data = {"email": "testuser@gmail.com",
                "password": "Testus1"}
        do_test(data)

class AccountView(TestCase):

    @classmethod
    def setUpTestData(cls) -> None:
        cls.test_data = {"email":"testuser@gmail.com",
                         "password": "Testuser1"}

    def test_account_create(self):
        url = reverse("accounts:account-create")

        response = self.client.post(url,self.test_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        verify_id = mail.outbox[0].body
        
        self.assertGreater(len(verify_id), 0)

        url = reverse("accounts:account-verify",args=[verify_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        


