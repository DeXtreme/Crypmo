from datetime import datetime, timedelta
import pandas as pd
from numpy import nan
from django.utils import timezone
from django.db.models import OuterRef, Subquery, Sum
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response


from .serializers import PairSerializer
from .models import Coin, Trade


class ExchangeView(GenericViewSet):

    lookup_field = "ticker"
    queryset = Coin.objects.all()
    
    def get_permissions(self):
        if(self.action in ["list","retrieve"]):
            return []
        return super().get_permissions()

    def list(self, request, *args, **kwargs):
        trades_today = Trade.objects.filter(coin=OuterRef("id"),
                                            created_at__date=timezone.now())

        first_price_today = Subquery(trades_today.values("price")[:1]) 

        volume_today = Subquery(trades_today.values("coin")\
                                      .annotate(volume=Sum("amount"))\
                                      .values("volume"))

        last_price = Subquery(Trade.objects.filter(coin=OuterRef("id"))\
                                           .order_by("-created_at")
                                           .values("price")[:1])
        
        pairs = Coin.objects.annotate(last_price=last_price,
                                      first_price_today=first_price_today,
                                      volume_today=volume_today)
        
        serializer = PairSerializer(pairs, many=True)
        data = serializer.data
        return Response(data)
    
    
    def retrieve(self,request,*args,**kwargs):

        coin = self.get_object()
        to = request.query_params.get("to", None)
        interval = request.query_params.get("interval","").lower()
        
        intervals = {"d1": {"delta": timedelta(days=30),"offset": "D"},
                     "h4": {"delta": timedelta(hours=24*6),"offset": "4H"},
                     "h": {"delta": timedelta(hours=24*3),"offset": "H"},
                     "m5": {"delta": timedelta(minutes=24*60),"offset": "5T"},
                     "m1": {"delta": timedelta(minutes=12*60), "offset": "T"}}

        interval = intervals.get(interval, intervals["h"])

        to_time = datetime.fromtimestamp(to, timezone.utc) if to else timezone.now()
        from_time = to_time - interval["delta"]

        trade_data = Trade.objects.filter(coin=coin,
                                          created_at__gte=from_time,
                                          created_at__lt=to_time)\
                                  .values_list("created_at","price","amount")

        df = pd.DataFrame(list(trade_data), columns=["time","price","volume"])
            
        df["open"] = df["price"]
        df["high"] = df["price"]
        df["low"] = df["price"]
        df["close"] = df["price"]
                  
        df = df.resample(interval["offset"], on="time")\
               .agg({"open": lambda x: x.iloc[0] if len(x) > 0 else nan,
                     "high": lambda x: x.max() if len(x) > 0 else nan,
                     "low": lambda x: x.min() if len(x) > 0 else nan,
                     "close": lambda x: x.iloc[-1] if len(x) > 0 else nan,
                     "volume": lambda x: x.sum()})

        df = df.reset_index()    
        df = df.dropna()

        return Response(df.to_dict('records'))
    
        
