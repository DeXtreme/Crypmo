from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    AccountView,
    AccountTokenObtainPairView
)
app_name = 'accounts'

urlpatterns =[
    path("", AccountView.as_view({"post": "create"}), name="account-create"),
    path("", AccountView.as_view({"get": "retrieve"}), name="account-detail"),
    path("verify/<str:verify_id>", AccountView.as_view({"get": "verify"},**AccountView.verify.kwargs), name="account-verify"),
    path('token', AccountTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path("reset", AccountView.as_view({"post": "reset"}, **AccountView.reset.kwargs), name="password-reset"),
    path("reset/<str:reset_token>", AccountView.as_view({"post": "reset_token"}, **AccountView.reset_token.kwargs), name="password-reset-token")
]