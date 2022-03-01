import { useContext } from "react";
import context from './context';

export function useTickers(){
    let socket = useContext(context);

    return({
        subscribe: (view,callback) =>{
            socket.subscribeTickers(view,callback)
        },
        isSubscribed: (view) => socket.isSubscribedTickers(view),
        unsubscribe: (view) => socket.unsubscribeTickers(view)
    })
}