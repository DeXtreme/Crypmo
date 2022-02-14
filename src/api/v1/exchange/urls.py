import imp
from rest_framework.routers import DefaultRouter
from .views import ExchangeView

app_name = "exchange"

router = DefaultRouter()
router.register("", ExchangeView, basename="exchange")

urlpatterns = [
    *router.urls
]