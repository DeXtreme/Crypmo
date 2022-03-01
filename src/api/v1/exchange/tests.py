from unittest.mock import patch
from django.test import TestCase
from django.urls import reverse
from django.utils import dateparse
from rest_framework.test import APITestCase
from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
from channels.testing import WebsocketCommunicator

from v1.accounts.models import Account
from .models import *
from .serializers import *
from .tasks import *
from .consumers import ExchangeWebsocket


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

        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["name"], self.coin.name)
        self.assertEqual(data[0]["ticker"], self.coin.ticker)
        self.assertEqual(data[0]["blockchain"], self.coin.blockchain.name)
        self.assertEqual(data[0]["price"], self.trade_2.price)
        self.assertEqual(data[0]["volume"], self.trade_1.amount + self.trade_2.amount)
        self.assertEqual(data[0]["change"], ((self.trade_2.price-self.trade_1.price)/self.trade_1.price)*100)

    def test_get_coin_price_history_default(self):
        url = reverse("exchange:exchange-detail",args=["TC"])

        response = self.client.get(url)
        data = response.json()


        self.assertEqual(len(data),1)
        self.assertIn("time",data[0])
        self.assertIn("open",data[0])
        self.assertIn("high",data[0])
        self.assertIn("low",data[0])
        self.assertIn("close",data[0])
        self.assertIn("volume",data[0])
        self.assertEqual(data[0]["open"],self.trade_1.price)
        self.assertEqual(data[0]["high"],self.trade_2.price)
        self.assertEqual(data[0]["low"],self.trade_1.price)
        self.assertEqual(data[0]["close"],self.trade_2.price)
        self.assertEqual(data[0]["volume"],self.trade_1.amount+self.trade_2.amount)
        self.assertEqual(dateparse.parse_datetime(data[0]["time"]),self.trade_2.created_at.replace(minute=0,second=0,microsecond=0))

    
    def test_get_coin_price_history_m1(self):
        url = reverse("exchange:exchange-detail",args=["TC"])

        response = self.client.get(url,{"interval":"m1"})
        data = response.json()


        self.assertEqual(len(data),1)
        self.assertIn("open",data[0])
        self.assertIn("high",data[0])
        self.assertIn("low",data[0])
        self.assertIn("close",data[0])
        self.assertIn("volume",data[0])
        self.assertEqual(data[0]["open"],self.trade_1.price)
        self.assertEqual(data[0]["high"],self.trade_2.price)
        self.assertEqual(data[0]["low"],self.trade_1.price)
        self.assertEqual(data[0]["close"],self.trade_2.price)
        self.assertEqual(data[0]["volume"],self.trade_1.amount+self.trade_2.amount)
        self.assertEqual(dateparse.parse_datetime(data[0]["time"]),self.trade_2.created_at.replace(second=0,microsecond=0))
    
    def test_get_coin_price_history_d1(self):
        url = reverse("exchange:exchange-detail",args=["TC"])

        response = self.client.get(url,{"interval":"D1"})
        data = response.json()


        self.assertEqual(len(data),1)
        self.assertIn("open",data[0])
        self.assertIn("high",data[0])
        self.assertIn("low",data[0])
        self.assertIn("close",data[0])
        self.assertIn("volume",data[0])
        self.assertEqual(data[0]["open"],self.trade_1.price)
        self.assertEqual(data[0]["high"],self.trade_2.price)
        self.assertEqual(data[0]["low"],self.trade_1.price)
        self.assertEqual(data[0]["close"],self.trade_2.price)
        self.assertEqual(data[0]["volume"],self.trade_1.amount+self.trade_2.amount)
        self.assertEqual(dateparse.parse_datetime(data[0]["time"]),
                         self.trade_2.created_at.replace(hour=0,minute=0,second=0,microsecond=0))

class ExchangeWebsocketTestCase(TestCase):

    @patch("v1.exchange.tasks.Coin.objects.annotate")
    async def test_ticker_feed(self, annotate):
        communicator = WebsocketCommunicator(ExchangeWebsocket.as_asgi(),"/")
        connected, _ = await communicator.connect()
        self.assertTrue(connected)

        await communicator.send_json_to(
            {"action": "subscribe", "group": "tickers"}
        )

        class TestPair:
            def __init__(self, id, ticker, last_price, first_price_today, volume_today):
                self.id = id
                self.ticker = ticker
                self.last_price = last_price
                self.first_price_today = first_price_today
                self.volume_today = volume_today

            def calculate_change(self):
                delta = self.last_price-self.first_price_today
                change = delta/self.first_price_today
                change *= 100
                return change

        test_pair = TestPair(1,"ADA", 1.2, 1.4, 100)
        annotate.return_value= [test_pair]

        await sync_to_async(ticker)()
        
        response = await communicator.receive_json_from(timeout=10)

        self.assertIn("group", response)
        self.assertIn("data", response)
        self.assertEqual(len(response["data"]), 1)
        self.assertEqual(response["data"][0]["id"], test_pair.id)
        self.assertEqual(response["data"][0]["ticker"], test_pair.ticker)
        self.assertEqual(response["data"][0]["price"], test_pair.last_price)
        self.assertEqual(response["data"][0]["volume"], test_pair.volume_today)
        self.assertEqual(response["data"][0]["change"], test_pair.calculate_change())
        
        await communicator.disconnect()
    



