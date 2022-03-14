import datetime
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
        if(self.action in ["list","retrieve","candles"]):
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
    
    def retrieve(self,request,ticker,*args,**kwargs):
    
        trades_today = Trade.objects.filter(coin=OuterRef("id"),
                                            created_at__date=timezone.now())

        first_price_today = Subquery(trades_today.values("price")[:1]) 

        volume_today = Subquery(trades_today.values("coin")\
                                      .annotate(volume=Sum("amount"))\
                                      .values("volume"))

        last_price = Subquery(Trade.objects.filter(coin=OuterRef("id"))\
                                           .order_by("-created_at")
                                           .values("price")[:1])
        
        pair = Coin.objects.filter(ticker=ticker)\
                           .annotate(last_price=last_price,
                                     first_price_today=first_price_today,
                                     volume_today=volume_today).get()

        serializer = PairSerializer(pair)
        data = serializer.data
        return Response(data)

    
    @action(methods=["GET"], detail=True)
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

    
        """
        #TODO: get latest 100
        intervals = {"d1": {"delta": timedelta(days=30),"offset": "D"},
                     "h4": {"delta": timedelta(hours=24*6),"offset": "4H"},
                     "h1": {"delta": timedelta(hours=24*3),"offset": "H"},
                     "m5": {"delta": timedelta(minutes=24*60),"offset": "5T"},
                     "m1": {"delta": timedelta(minutes=10), "offset": "T"}}

        if interval:
            interval = interval.lower()
        else:
            interval = "h1"

        interval_data = intervals.get(interval, intervals["h1"])

        if to:
            to_time = datetime.fromtimestamp(int(to), timezone.utc)
            from_time = to_time - interval_data["delta"]
        else:
            last_trade = list(Trade.objects.filter(coin=coin).order_by("-created_at")[:1])
            if(last_trade):
                last_trade_time = last_trade[0].created_at
                from_time = last_trade_time - interval_data["delta"]
                to_time = timezone.now()
            else:
                response = {"interval": interval,
                            "candles":[]}
                return Response(response)

            
        trade_data = Trade.objects.filter(coin=coin,
                                          created_at__gte=from_time,
                                          created_at__lt=to_time)\
                                  .values_list("created_at","price","amount")

        df = pd.DataFrame(list(trade_data), columns=["time","price","volume"])

        df["open"] = df["price"]
        df["high"] = df["price"]
        df["low"] = df["price"]
        df["close"] = df["price"]
        
        if not df.empty:
            df = df.resample(interval_data["offset"], on="time")\
                .agg({"open": lambda x: x.iloc[0] if len(x) > 0 else nan,
                        "high": lambda x: x.max() if len(x) > 0 else nan,
                        "low": lambda x: x.min() if len(x) > 0 else nan,
                        "close": lambda x: x.iloc[-1] if len(x) > 0 else nan,
                        "volume": lambda x: x.sum()})

        df = df.reset_index()    
        df = df.dropna()
        response = {"interval": interval,
                    "candles":df.to_dict('records')}

        return Response(response)
        """
        
