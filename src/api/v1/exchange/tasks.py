from datetime import timedelta, datetime
from django.db.models import OuterRef, Subquery, Sum
from crypmo.celery import app
from .models import Coin,Trade
from .serializers import TickerSerializer


@app.on_after_finalize.connect
def setupTicker(sender,**kwargs):
    sender.add_periodic_task(3.0, ticker.s(), name='ticker every second')

@app.task
def ticker():
    trades_today = Trade.objects.filter(coin=OuterRef("id"),
                                        created_at__date=datetime.now())

    first_trade = Subquery(trades_today.values("price")[:1]) 

    volume = Subquery(trades_today.values("coin")\
                                  .annotate(volume=Sum("amount"))\
                                  .values("volume"))

    last_trade = Subquery(Trade.objects.filter(coin=OuterRef("id"))\
                                       .order_by("-created_at")
                                       .values("price")[:1])
    
    pairs = Coin.objects.annotate(price=last_trade,
                                  first=first_trade,
                                  volume=volume)
    
    serializer = TickerSerializer(pairs, many=True)
    data = serializer.data
    
    print(data)
