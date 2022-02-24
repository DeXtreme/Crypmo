from django.urls import path
from .consumers import ExchangeWebsocket

websocket_urlpatterns = [path("ws/exchange", ExchangeWebsocket.as_asgi())]