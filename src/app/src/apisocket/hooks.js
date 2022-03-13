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

export function useKline(){
    let socket = useContext(context);

    return({
        subscribe: (pair_id,interval,callback) =>{
            socket.subscribeKline(pair_id,interval,callback)
        },
        isSubscribed: () => socket.isSubscribedKline(),
        unsubscribe: () => socket.unsubscribeKline()
    })
}