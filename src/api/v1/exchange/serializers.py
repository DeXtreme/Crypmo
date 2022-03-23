from numpy import source
from rest_framework import serializers

from .models import (
    Coin,
    Order,
    Trade,
    CoinBalance,
    FiatBalance,
    Candle
)

class CoinSerializer(serializers.ModelSerializer):
    blockchain = serializers.CharField(source="blockchain.name")

    class Meta:
        model = Coin
        fields = ["name", "ticker", "blockchain"]


class PairSerializer(serializers.Serializer):
    id= serializers.IntegerField()
    name = serializers.CharField()
    ticker = serializers.CharField()
    blockchain = serializers.CharField(source="blockchain.name")
    price = serializers.SerializerMethodField()
    volume = serializers.SerializerMethodField()
    change = serializers.SerializerMethodField()

    def get_change(self, obj):
        if(obj.last_price and obj.first_price_today):
            return ((obj.last_price-obj.first_price_today)/obj.first_price_today) * 100

        return 0
    
    def get_price(self, obj):
        return obj.last_price if obj.last_price else 0

    def get_volume(self, obj):
        return obj.volume_today if obj.volume_today else 0

class TickerSerializer(serializers.Serializer):
    id= serializers.IntegerField()
    ticker = serializers.CharField()
    price = serializers.SerializerMethodField()
    volume = serializers.SerializerMethodField()
    change = serializers.SerializerMethodField()

    def get_change(self, obj):
        if(obj.last_price and obj.first_price_today):
            return ((obj.last_price-obj.first_price_today)/obj.first_price_today) * 100

        return 0
    
    def get_price(self, obj):
        return obj.last_price if obj.last_price else 0

    def get_volume(self, obj):
        return obj.volume_today if obj.volume_today else 0

class CandleSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()

    def get_time(self,obj):
        return obj.time.timestamp()
    class Meta:
        model = Candle
        fields = ["id","open","high","low","close","volume","time"]
    
class OrderSerializer(serializers.ModelSerializer):
     coin = CoinSerializer()

     class Meta:
         model = Order
         fields = ["coin","order_id","type","position","amount","filled","price"]


class TradeSerializer(serializers.ModelSerializer):
     coin = CoinSerializer()

     class Meta:
         model = Trade
         fields = ["coin","position","amount","price"]

class CoinBalanceSerializer(serializers.ModelSerializer):
    coin = CoinSerializer()

    class Meta:
        model = CoinBalance
        fields = ["coin","balance"]

class FiatBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FiatBalance
        fields = ["balance"]


class AccountBalance(serializers.Serializer):
    fiat = FiatBalanceSerializer()
    coin = CoinBalanceSerializer()