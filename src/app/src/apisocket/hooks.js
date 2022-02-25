import { useContext } from "react";
import Provider from './Provider';

export function useTickers(){
    let socket = useContext(Provider);

    return({
        subscribe: (view,pairs,callback) =>{
            socket.subscribeTickers(view,callback)
        },
        isSubscribed: (view) => socket.isSubscribedTickers(view),
        unsubscribe: (view) => socket.unsubscribeTickers(view)
    })
}