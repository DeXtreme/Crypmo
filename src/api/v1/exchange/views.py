from datetime import datetime
from django.db.models import OuterRef, Subquery, Sum, Value
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.response import Response


from .serializers import PairSerializer
from .models import Coin, Trade


class ExchangeView(GenericAPIView):

    permission_classes = []
    queryset = Coin.objects.all()
    
    def get(self, request, *args, **kwargs):
        trades_today = Trade.objects.filter(coin=OuterRef("id"),
                                            created_at__date=datetime.now())

        first_trade = Subquery(trades_today.order_by("created_at").values("price")[:1]) 
        # Annotating a static value to remove default grouping
        volume = Subquery(trades_today.annotate(x=Value(1))\
                                      .values("x")\
                                      .annotate(volume=Sum("amount"))\
                                      .values("volume"))

        last_trade = Subquery(Trade.objects.filter(coin=OuterRef("id"))\
                                           .order_by("-created_at")
                                           .values("price")[:1])
        
        pairs = Coin.objects.annotate(price=last_trade,
                                      first=first_trade,
                                      volume=volume)
        
        serializer = PairSerializer(pairs, many=True)
        data = serializer.data
        return Response(data)
