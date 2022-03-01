import socket from "./APISocket";
import context from "./context";
export { useTickers } from './hooks'; 


export function APISocketProvider({children}){
    return(
        <context.Provider value={socket}>
            {children}
        </context.Provider>
    )
}

