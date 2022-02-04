from email.policy import default
from rest_framework import serializers

from .models import (
    Coin,
    Order,
    Trade,
    CoinBalance,
    FiatBalance
)

class CoinSerializer(serializers.ModelSerializer):
    blockchain = serializers.CharField(source="blockchain.name")

    class Meta:
        model = Coin
        fields = ["name", "ticker", "blockchain"]


class PairSerializer(serializers.Serializer):
    name = serializers.CharField()
    ticker = serializers.CharField()
    blockchain = serializers.CharField(source="blockchain.name")
    price = serializers.SerializerMethodField()
    volume = serializers.SerializerMethodField()
    change = serializers.SerializerMethodField()

    def get_change(self, obj):
        if(obj.price and obj.first):
            return (obj.price-obj.first)/obj.first

        return 0
    
    def get_price(self, obj):
        return obj.price if obj.price else 0

    def get_volume(self, obj):
        return obj.volume if obj.volume else 0


    
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