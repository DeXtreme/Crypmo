import imp
from django.urls import path
from .views import ExchangeView

app_name = "exchange"

urlpatterns = [
    path("", ExchangeView.as_view(), name="exchange-list")
]