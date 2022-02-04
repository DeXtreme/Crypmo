from turtle import position
from uuid import uuid4
from django.db import models
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
    type: str
        The type of order
            L - Limit order
            M - Market order
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