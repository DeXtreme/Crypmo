import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class ExchangeWebsocket(WebsocketConsumer):
    def connect(self):
        self.groups = []
        self.accept()

    def disconnect(self, close_code):
        for group in self.groups:
            async_to_sync(self.channel_layer.group_discard)(
                group,
                self.channel_name
            )

    def receive(self, text_data):
        message = json.loads(text_data)

        if message["action"] == "subscribe":
            if message["group"] == "tickers":
                async_to_sync(self.channel_layer.group_add)(
                    "tickers",
                    self.channel_name
                )
                self.groups.append("tickers")
            elif message["group"] == "kline":
                coin_id = int(message["pair_id"])
                interval = str(message["interval"])

                group_name = f"{coin_id}_kline_{interval.lower()}"
                async_to_sync(self.channel_layer.group_add)(
                    group_name,
                    self.channel_name
                )
                self.groups.append(group_name)
        elif message["action"] == "unsubscribe":
            if message["group"] == "tickers":
                async_to_sync(self.channel_layer.group_discard)(
                    "tickers",
                    self.channel_name
                )
                self.groups.remove("tickers")
            elif message["group"] == "kline":
                coin_id = int(message["pair_id"])
                interval = str(message["interval"])

                group_name = f"{coin_id}_kline_{interval.lower()}"
                async_to_sync(self.channel_layer.group_discard)(
                    group_name,
                    self.channel_name
                )
                self.groups.remove(group_name)            


    def broadcast(self, event):
        data = event["data"]
        group = event["group"]
        message = {"group": group, "data": data}
        self.send(text_data=json.dumps(message))


