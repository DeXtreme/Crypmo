from operator import mod
from uuid import uuid4
from django.db import models
from django.db.models.functions import TruncDate
from django.db.models import F
from v1.accounts.models import Account

class Blockchain(models.Model):
    """ Blockchain model
    
    Attributes
    ----------
    name: str
        The name of the blockchain
    """
    name = models.CharField(max_length=50)

class Coin(models.Model):
    """ Coin model
    
    Attributes
    ----------
    name: str
        The name of coin
    ticker: str
        The coin ticker 
    blockchain: str
        The blockchain the coin belongs to
    contract: str
        The address of the contract if it is token
    """
    blockchain = models.ForeignKey(Blockchain, on_delete=models.CASCADE, related_name="coins")
    name = models.CharField(max_length=20, unique=True)
    ticker = models.CharField(max_length=5, unique=True)
    contract = models.CharField(max_length=100, unique=True, blank=True, null=True)


    def __str__(self):
        return self.name


class CoinBalance(models.Model):
    """ Coin balance of account
    
    Attributes
    ----------
    account: Account
        The account the coin belongs to
    coin: Coin
        The type of coin
    balance: float
        The amount of the coin
    """

    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="coins")
    coin = models.ForeignKey(Coin, on_delete=models.CASCADE)
    balance = models.FloatField(default=0)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.coin.name} - {self.balance}"
    

class FiatBalance(models.Model):
    """ Fiat balance of account(GHS)
    
    Attributes
    ----------
    account: Account
        The account the fiat belongs to
    balance: float
        The amount of fiat
    """

    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="fiat")
    balance = models.FloatField(default=0)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)



class Order(models.Model):
    """ Pending orders
    
    Attributes
    ----------
    account: Account
        The account the order belongs to
    coin: Coin
        The coin being traded
    order_id: UUID
        The unique id of the order
    type: str
        The type of order
            L - Limit order
            M - Market order
    position: str
        The position of the order
            B - Buy/Long
            S - Sell/Short
    amount: float
        The amount left to be traded
    filled : float
        The amount of order already filled
    price: float
        The price to trade at (Limit orders only)
    """

    class Positions(models.TextChoices):
        BUY = "B" #Long
        SELL = "S" #Short
    
    class Types(models.TextChoices):
        LIMIT = "L"
        MARKET = "M"

    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="orders")
    coin = models.ForeignKey(Coin, on_delete=models.CASCADE)
    order_id = models.UUIDField(default=uuid4)
    type = models.CharField(choices=Types.choices, max_length=2, default=None, blank=False, null=False)
    position = models.CharField(choices=Positions.choices, max_length=2, default=None, blank=False, null=False)
    amount = models.FloatField(null=False, blank=False)
    filled = models.FloatField(default=0)
    price = models.FloatField(null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Trade(models.Model):
    """ Filled orders

    Attributes
    ----------
    account: Account
        The account the order belongs to
    coin: Coin
        The coin that was traded
    position: str
        The position of the order
            B - Buy/Long
            S - Sell/Short
    amount: float
        The amount traded
    price: float
        The price traded at
    """

    class Positions(models.TextChoices):
        BUY = "B" #Long
        SELL = "S" #Short
    

    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="trades")
    coin = models.ForeignKey(Coin, on_delete=models.CASCADE, related_name="trades")
    position = models.CharField(choices=Positions.choices, max_length=2, default=None, blank=False, null=False)
    amount = models.FloatField(null=False, blank=False)
    price = models.FloatField(null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index("coin", TruncDate("created_at"),name="trade_date_idx"),
                   models.Index("coin",F("created_at").desc(),name="trade_latest_idx")]



class Candle(models.Model):
    """Candlestick data
    
    Attributes
    ----------
    coin: Coin
        The coin that was traded
    interval: str
        The interval
    open: float
        The open price
    high: float
        The high price
    low: float
        The low price
    close: float
        The close price
    """

    """
    TODO: Add candle manager with custom update_or_create
    insert into exchange_candle as ec  values(2,'h1',2,3,1,2.5,100,now(),now(),1)
    on conflict (id) do update set op
    en=ec.open, high=Greatest(ec.high,9), low=Least(ec.low,0), close=4;
    TODO:Add unique constraint on time,interval,coin 
    """

    class Interval(models.TextChoices):
        m1 = "m1"
        h1 = "h1"
        h4 = "h4"
        d1 = "d1"
    
    coin = models.ForeignKey(Coin, on_delete=models.CASCADE, related_name="candles")
    interval = models.CharField(choices=Interval.choices, max_length=3)
    open = models.FloatField(null=False, blank=False)
    high = models.FloatField(null=False, blank=False)
    low = models.FloatField(null=False, blank=False)
    close = models.FloatField(null=False, blank=False)
    volume = models.FloatField(null=False, blank=False)
    time = models.DateTimeField()
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        indexes = [models.Index("coin","interval",F("time").desc(), name="candles_idx")]
