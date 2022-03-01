import { WEBSOCKET_URL } from "./constants";

class APISocket{
    constructor(){
        this.ws = null;
        this.subscriptions = {ticker:{}, wallet: null, orders: null}   
        this.pending = {}
        this.connect(); 
    }

    connect(){ 
        this.ws = new WebSocket(WEBSOCKET_URL);

        this.ws.onmessage = (message)=>{
            message = JSON.parse(message.data);
            switch(message.group){
                case "tickers":
                    console.log(this.subscriptions.ticker)
                    console.log(Object.values(this.subscriptions.ticker))
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

        this.ws.onclose = ()=>{
            this.subscriptions.ticker = {};
            setTimeout(this.connect.bind(this), 5000);
        }

    }

    subscribeTickers(view, callback){
       this._createPendingEvent(view, "tickers", ()=>{
            this.ws.send(JSON.stringify({action: "subscribe", group:"tickers"}));
            this.subscriptions.ticker[view] = callback;
       })
    }

    unsubscribeTickers(view){
        this._createPendingEvent(view, "tickers", ()=>{
            delete this.subscriptions.ticker[view];
            if(Object.keys(this.subscriptions.ticker).length===0){
                this.ws.send(JSON.stringify({action: "unsubscribe", group:"tickers"}))
            }
        })
    }

    isSubscribedTickers(view){
        return view in this.subscriptions.ticker;
    }

    _createPendingEvent(view, group, event){
        const event_id = setInterval(()=>{
            if(this.ws && this.ws.OPEN){
                event()
                clearInterval(event_id);
                if(this.pending[view]?.[group] === event_id){
                    delete this.pending[view][group];
                }
            }else{
                if(this.pending[view]?.[group] !== event_id){
                    if(this.pending[view]?.[group]){
                        clearInterval(this.pending[view]?.[group]);
                    }
                    this.pending[view] = {...this.pending[view], group, event_id};
                }
            }
        }, 2000) 
    }
}

const socket = new APISocket();

export default socket;


