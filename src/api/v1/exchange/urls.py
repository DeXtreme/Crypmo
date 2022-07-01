import imp
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ExchangeView

app_name = "exchange"
urlpatterns = []

router = DefaultRouter()
router.register("", ExchangeView, basename="exchange")
urlpatterns += router.urls
