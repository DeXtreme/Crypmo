import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "./components/Alert";
import accountSlice from './slices/account';

import { API_URL, 
    NETWORK_ERROR_HEADER,
    NETWORK_ERROR_MESSAGE,
    SERVER_ERROR_HEADER,
    SERVER_ERROR_MESSAGE } from "./constants";

export function useAPI(){
    let {showFailAlert, hideAlert} = useAlert();


    const request = async (url,method,body,callback) => {
        let requestInfo = {method, headers: {'Content-Type' : "application/json"}}
        
        if(method === "POST"){
            requestInfo.body = JSON.stringify(body);
        }
            
        let response = await fetch(`${API_URL}/${url}`, requestInfo)
                            .catch(e =>{
                                showFailAlert(NETWORK_ERROR_HEADER, NETWORK_ERROR_MESSAGE)
                                return null;
                            });

        hideAlert("Please check your internet connection");
        if(response.statusCode === 500){
            showFailAlert(SERVER_ERROR_HEADER,SERVER_ERROR_MESSAGE);
            response = null;
        }

        return await callback(response);
    }

    return {get : (url,callback) => request(url,"GET",null,callback),
            post: (url,body,callback) => request(url,"POST",body,callback)};
}

export function useAccount(){
    let account = useSelector(state => state.account);
    let dispatch = useDispatch();

    return {
        account,
        login({username, access, refresh}){
            dispatch(accountSlice.actions.login({username, access, refresh}))
        },
        logout(){
            dispatch(accountSlice.actions.logout())
        }
    }
}
