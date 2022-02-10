from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

from v1.accounts.models import Account
from .models import *
from .serializers import *

class SerializersTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls) -> None:
        user = User.objects.create_user("testuser", "testpass")
        cls.account = Account.objects.create(user=user)
        blockchain = Blockchain.objects.create(name="TestChain")
        cls.coin = Coin.objects.create(blockchain=blockchain, name="TestCoin",
                                       ticker="TC")
        cls.coin_balance = CoinBalance.objects.create(account=cls.account, coin=cls.coin)
        cls.fiat_balance = FiatBalance.objects.create(account=cls.account)
        cls.order = Order.objects.create(account=cls.account, coin=cls.coin, 
                                         type=Order.Types.LIMIT, position=Order.Positions.BUY,
                                         amount=100,price=1)
        cls.trade = Trade.objects.create(account=cls.account, coin=cls.coin, 
                                         position=Order.Positions.BUY, amount=100,price=1)
    
    def test_coin_serializer(self):
        serializer = CoinSerializer(self.coin)
        data = serializer.data

        self.assertEqual(data["name"], self.coin.name)
        self.assertEqual(data["ticker"], self.coin.ticker)
        self.assertEqual(data["blockchain"], self.coin.blockchain.name)
    
    def test_coin_balance_serializer(self):
        serializer = CoinBalanceSerializer(self.coin_balance)
        data = serializer.data

        self.assertEqual(data["coin"]["name"], self.coin_balance.coin.name)
        self.assertEqual(data["balance"], self.coin_balance.balance)
    
    def test_fiat_balance_serializer(self):
        serializer = FiatBalanceSerializer(self.fiat_balance)
        data = serializer.data

        self.assertEqual(data["balance"], self.fiat_balance.balance)

    def test_order_serializer(self):
        serializer = OrderSerializer(self.order)
        data = serializer.data

        self.assertEqual(data["coin"]["name"], self.order.coin.name)
        self.assertEqual(data["order_id"], str(self.order.order_id))
        self.assertEqual(data["type"], self.order.type)
        self.assertEqual(data["position"], self.order.position)
        self.assertEqual(data["amount"], self.order.amount)
        self.assertEqual(data["filled"], self.order.filled)
        self.assertEqual(data["price"], self.order.price)

    def test_trade_serializer(self):
        serializer = TradeSerializer(self.trade)
        data = serializer.data

        self.assertEqual(data["coin"]["name"], self.trade.coin.name)
        self.assertEqual(data["position"], self.trade.position)
        self.assertEqual(data["amount"], self.trade.amount)
        self.assertEqual(data["price"], self.trade.price)


class ExchangeViewTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls) -> None:
        user_1 = User.objects.create_user("testuser1", "testpass")
        user_2 = User.objects.create_user("testuser2", "testpass")

        cls.account_1 = Account.objects.create(user=user_1)
        cls.account_2 = Account.objects.create(user=user_2)
        
        blockchain = Blockchain.objects.create(name="TestChain")
        cls.coin = Coin.objects.create(blockchain=blockchain, name="TestCoin",
                                       ticker="TC")

        cls.coin_balance_1 = CoinBalance.objects.create(account=cls.account_1, coin=cls.coin)
        cls.fiat_balance_1 = FiatBalance.objects.create(account=cls.account_1)

        cls.coin_balance_2 = CoinBalance.objects.create(account=cls.account_2, coin=cls.coin)
        cls.fiat_balance_2 = FiatBalance.objects.create(account=cls.account_2)

        cls.order_1 = Order.objects.create(account=cls.account_1, coin=cls.coin, 
                                         type=Order.Types.MARKET, position=Order.Positions.BUY,
                                         amount=100, price=0)
        
        cls.order_2 = Order.objects.create(account=cls.account_2, coin=cls.coin, 
                                         type=Order.Types.LIMIT, position=Order.Positions.SELL,
                                         amount=100, price=1)
        
        cls.trade_1 = Trade.objects.create(account=cls.account_1, coin=cls.coin, position=Trade.Positions.BUY,
                                           amount=200,price=1.2)
        cls.trade_2 = Trade.objects.create(account=cls.account_2, coin=cls.coin, position=Trade.Positions.BUY,
                                           amount=100,price=1.4)

    
    def test_list_coins(self):
        url = reverse("exchange:exchange-list")

        response = self.client.get(url)
        data = response.json()

        print(data)

        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["name"], self.coin.name)
        self.assertEqual(data[0]["ticker"], self.coin.ticker)
        self.assertEqual(data[0]["blockchain"], self.coin.blockchain.name)
        self.assertEqual(data[0]["price"], self.trade_2.price)
        self.assertEqual(data[0]["volume"], self.trade_1.amount + self.trade_2.amount)
        self.assertEqual(data[0]["change"], ((self.trade_2.price-self.trade_1.price)/self.trade_1.price)*100)

    

    



