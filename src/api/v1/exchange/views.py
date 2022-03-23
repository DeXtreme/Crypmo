from django.utils import timezone
from django.db.models import OuterRef, Subquery, Sum
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import PairSerializer, CandleSerializer
from .models import Coin, Trade, Candle

class ExchangeView(GenericViewSet):

    lookup_field = "ticker"
    queryset = Coin.objects.all()
    
    def get_permissions(self):
        if(self.action in ["list","retrieve"]):
            return []
        return super().get_permissions()
    

    def get_pair_data(self, queryset):
        """Get the first price, last price and 24h volume
        of all pair in queryset
        
        Parameters
        ----------
        queryset: QuerySet
            Queryset of pairs

        Returns
        -------
        QuerySet
            Queryset of pairs with the data
        """
        trades_today = Trade.objects.filter(coin=OuterRef("id"),
                            created_at__date=timezone.now())

        first_price_today = Subquery(trades_today.values("price")[:1]) 

        volume_today = Subquery(
                            trades_today.values("coin")\
                                .annotate(volume=Sum("amount"))\
                                .values("volume")
                        )

        last_price = Subquery(
                        Trade.objects.filter(coin=OuterRef("id"))\
                            .order_by("-created_at")
                            .values("price")[:1]
                    )
        
        pairs = queryset.annotate(last_price=last_price,
                    first_price_today=first_price_today,
                    volume_today=volume_today)
        
        return pairs
        

    def list(self, request, *args, **kwargs):
        pairs = self.get_pair_data(self.get_queryset())
        
        serializer = PairSerializer(pairs, many=True)
        data = serializer.data

        return Response(data)
    

    def retrieve(self,request,ticker,*args,**kwargs):
        queryset = self.get_queryset().filter(ticker=ticker)
        pair = self.get_pair_data(queryset).get()

        serializer = PairSerializer(pair)
        data = serializer.data
        return Response(data)

    
    @action(methods=["GET"], detail=True,
    permission_classes=[])
    def candles(self,request,*args,**kwargs):

        coin = self.get_object()
        to = request.query_params.get("to", None)
        interval = request.query_params.get("interval","h1").lower()

        candles = Candle.objects.filter(coin=coin,
                                        interval=interval)
        if to:
            candles = candles.filter(pk__lt=to)
        
        candles = candles.order_by("-time")[:10]
        
        serializer = CandleSerializer(candles, many=True)
        data = serializer.data
        return Response({"interval":interval,"candles":data})

