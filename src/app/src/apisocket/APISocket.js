import { WEBSOCKET_URL } from "./constants";

class APISocket{
    constructor(){
        this.ws = null;
        this.subscriptions = {ticker:{}, wallet: null, orders: null}   
        this.connect(); 
    }

    connect(){ 
        console.log(WEBSOCKET_URL);
        this.ws = new WebSocket(WEBSOCKET_URL);

        this.ws.onmessage = (message)=>{
            message = JSON.parse(message.data);
            console.log(message);
            switch(message.group){
                case "tickers":
                    Object.values(this.subscriptions.ticker).forEach(
                        (callback)=>callback(message.data));
                    break;
                case "wallet":
                    break;
                case "orders":
                    break
                default:  
            }
        }

        this.ws.onerror = ()=>{
            this.subscriptions.ticker = {};
            setTimeout(this.connect.bind(this), 5000);
        }

    }

    subscribeTickers(view, callback){
        this.ws.send(JSON.stringify({action: "subscribe", group:"ticker"}))
        this.subscriptions.ticker[view] = callback;
    }

    isSubscribedTickers(view){
        return view in this.subscriptions.ticker;
    }

    unsubscribeTickers(view){
        delete this.subscriptions.ticker[view];
        if(Object.keys(this.subscriptions.ticker).length===0){
            this.ws.send(JSON.stringify({action: "subscribe", group:"ticker"}))
        }
    }
}

const socket = new APISocket();

export default socket;


