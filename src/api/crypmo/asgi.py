"""
ASGI config for crypmo project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
import v1.exchange.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crypmo.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter( v1.exchange.routing.websocket_urlpatterns)
})

