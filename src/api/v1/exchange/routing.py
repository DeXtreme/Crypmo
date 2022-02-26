from django.urls import path
from .consumers import ExchangeWebsocket

websocket_urlpatterns = [path("v1/ws/exchange", ExchangeWebsocket.as_asgi())]