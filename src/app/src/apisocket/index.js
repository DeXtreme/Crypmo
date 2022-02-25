import socket from "./APISocket";
import Provider from "./Provider";
export { useTickers } from './hooks'; 


export function APISocketProvider({children}){
    return(
        <Provider value={socket}>
            {children}
        </Provider>
    )
}

