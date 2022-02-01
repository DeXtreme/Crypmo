from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    AccountView,
    AccountTokenObtainPairView
)
app_name = 'accounts'


urlpatterns =[
    path("", AccountView.as_view({"post": "create"}), name="account-create"),
    path("", AccountView.as_view({"get": "retrieve"}), name="account-detail"),
    path("verify/<str:verify_token>", AccountView.as_view({"get": "verify"},
         **AccountView.verify.kwargs), name="account-verify"),
    path("forgot", AccountView.as_view({"post": "forgot"},
         **AccountView.forgot.kwargs), name="account-forgot"),
    path("reset/<str:reset_token>", AccountView.as_view({"post": "reset", "get":"check_token"},
         **AccountView.reset.kwargs), name="account-password-reset"),
    path('token', AccountTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
