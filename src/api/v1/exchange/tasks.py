from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.utils import timezone
from django.db.models import OuterRef, Subquery, Sum
from crypmo.celery import app
from .models import Coin,Trade, Candle
from .serializers import TickerSerializer


@app.on_after_finalize.connect
def setupTicker(sender,**kwargs):
    sender.add_periodic_task(1, ticker.s(), name='ticker every second')

@app.task
def ticker():
    today = timezone.now().replace(hour=0,minute=0,second=0,microsecond=0)

    candle_today = Candle.objects.filter(coin=OuterRef("id"),
                        interval=Candle.Interval.d1,
                        time=today)

    close_today = Subquery(candle_today.values("close")[:1]) 
    volume_today = Subquery(candle_today.values("volume")[:1])

    previous_close = Subquery(
                        Candle.objects.filter(coin=OuterRef("id"),
                            interval=Candle.Interval.d1,
                            time__lt=today)\
                            .order_by('-time')\
                            .values("close")[:1]
                    )
    
    close = Candle.objects.filter(coin=OuterRef("id"),
                interval=Candle.Interval.d1)\
                .order_by('-time')\
                .values("close")[:1]
        
    pairs = Coin.objects.annotate(close_today=close_today,
                previous_close=previous_close,
                close=close,
                volume_today=volume_today)
    
    serializer = TickerSerializer(pairs, many=True)
    data = serializer.data
    
    async_to_sync(get_channel_layer().group_send)("tickers", 
        {
            "type": "broadcast",
            "group": "tickers",
            "data": data
        }
    )    


"""
@app.task
def ticker_kline(coin_id):
    intervals = {"d1": "D",
                 "h4": "4H",
                 "h1": "H",
                 "m5": "5T",
                 "m1": "T"}

    from_time = timezone.now() - timedelta(days=1)
    trade_data = Trade.objects.filter(coin=coin_id,
                                      created_at__gte=from_time)\
                              .values_list("created_at","price","amount")

    df = pd.DataFrame(list(trade_data), columns=["time","price","volume"])
        
    df["open"] = df["price"]
    df["high"] = df["price"]
    df["low"] = df["price"]
    df["close"] = df["price"]

    for interval, offset in intervals:
                
        df2 = df.resample(offset, on="time")\
                .agg({"open": lambda x: x.iloc[0] if len(x) > 0 else nan,
                      "high": lambda x: x.max() if len(x) > 0 else nan,
                      "low": lambda x: x.min() if len(x) > 0 else nan,
                      "close": lambda x: x.iloc[-1] if len(x) > 0 else nan,
                      "volume": lambda x: x.sum()})

        df2 = df2.reset_index()    
        df2 = df2.dropna()

        data = {"interval":interval, "candle": df2.to_dict('records')[-1]}

        group_name = f"{coin_id}_kline_{interval}"

        async_to_sync(get_channel_layer.group_send)(
            group_name, 
            data
        )  
"""