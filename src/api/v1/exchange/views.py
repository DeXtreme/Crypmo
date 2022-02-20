
from datetime import timedelta, datetime
import pandas as pd
import numpy as np
from django.utils import timezone
from django.db.models import OuterRef, Subquery, Sum, Value
from rest_framework.viewsets import GenericViewSet
from rest_framework import status
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
    
    
    def retrieve(self,request,*args,**kwargs):

        coin = self.get_object()
        start = request.query_params.get("start","")
        interval = request.query_params.get("interval","").lower()
        

        if interval == "d1":
            now = timezone.now().date()
            start_time = now-timedelta(days=30)
            trade_data = Trade.objects.filter(coin=coin,
                                              created_at__gte=start_time)\
                                      .values_list("created_at","price","amount")

            df = pd.DataFrame(list(trade_data),
                              columns=["time","price","volume"])
            
            
            df = df.resample("D", on="time")\
                   .agg({"price": lambda x: x.iloc[-1] if len(x) > 0 else np.nan,
                         "volume": lambda x: x.sum()})

        elif interval == "h4":
            now = timezone.now().replace(minute=0,second=0,microsecond=0)
            start_time = now-timedelta(hours=24*6)
            trade_data = Trade.objects.filter(coin=coin,
                                              created_at__gte=start_time)\
                                      .values_list("created_at","price","amount")

            df = pd.DataFrame(list(trade_data),
                              columns=["time","price","volume"])
            
            df = df.resample("4H", on="time")\
                   .agg({"price": lambda x: x.iloc[-1] if len(x) > 0 else np.nan,
                         "volume": lambda x: x.sum()})
        elif interval == "m5":
            now = timezone.now().replace(second=0,microsecond=0)
            start_time = now-timedelta(minutes=24*60)
            trade_data = Trade.objects.filter(coin=coin,
                                              created_at__gte=start_time)\
                                      .values_list("created_at","price","amount")

            df = pd.DataFrame(list(trade_data),
                              columns=["time","price","volume"])
            
            df = df.resample("5T", on="time")\
                   .agg({"price": lambda x: x.iloc[-1] if len(x) > 0 else np.nan,
                         "volume": lambda x: x.sum()})

        elif interval == "m1":
            now = timezone.now().replace(second=0,microsecond=0)
            start_time = now-timedelta(minutes=12*60)
            trade_data = Trade.objects.filter(coin=coin,
                                              created_at__gte=start_time)\
                                      .values_list("created_at","price","amount")

            df = pd.DataFrame(list(trade_data),
                              columns=["time","price","volume"])
            
            df = df.resample("T", on="time")\
                   .agg({"price": lambda x: x.iloc[-1] if len(x) > 0 else np.nan,
                         "volume": lambda x: x.sum()})
            
        else:
            now = timezone.now().replace(minute=0,second=0,microsecond=0)
            start_time = now-timedelta(hours=24*3)
            trade_data = Trade.objects.filter(coin=coin,
                                              created_at__gte=start_time)\
                                      .values_list("created_at","price","amount")

            df = pd.DataFrame(list(trade_data),
                              columns=["time","price","volume"])
            
            df = df.resample("H", on="time")\
                   .agg({"price": lambda x: x.iloc[-1] if len(x) > 0 else np.nan,
                         "volume": lambda x: x.sum()})
            
        df = df.reset_index()    
        df = df.dropna()

        return Response(df.to_dict('records'))
    
        
