from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    AccountViewSet,
    VerifyAccountView,
    ForgotPasswordView,
    ResetPasswordView,
    AccountTokenObtainPairView
)
app_name = 'accounts'

router = DefaultRouter()
router.register("", AccountViewSet, basename="account")


urlpatterns =[
    *router.urls,
    path("verify/<str:verify_token>", VerifyAccountView.as_view(), name="verify"),
    path("forgot", ForgotPasswordView.as_view(), name="forgot"),
    path("reset/<str:reset_token>", ResetPasswordView.as_view(), name="reset"),
    path('token', AccountTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]