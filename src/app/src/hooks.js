import { useFailAlert, useHideAlert } from "./components/Alert";
import { API_URL, 
    NETWORK_ERROR_HEADER,
    NETWORK_ERROR_MESSAGE,
    SERVER_ERROR_HEADER,
    SERVER_ERROR_MESSAGE } from "./constants";

export function useAPI(){
    let showFail = useFailAlert();
    let hideAlert = useHideAlert();

    const request = async (url,method,body,callback) => {
        let requestInfo = {method, headers: {'Content-Type' : "application/json"}}
        
        if(method === "POST"){
            requestInfo.body = JSON.stringify(body);
        }
            
        let response = await fetch(`${API_URL}/${url}`, requestInfo)
                            .catch(e =>{
                                showFail(NETWORK_ERROR_HEADER, NETWORK_ERROR_MESSAGE)
                                return null;
                            });

        hideAlert("Please check your internet connection");
        if(response.statusCode === 500){
            showFail(SERVER_ERROR_HEADER,SERVER_ERROR_MESSAGE);
            response = null;
        }

        return await callback(response);
    }

    return {get : (url,callback) => request(url,"GET",null,callback),
            post: (url,body,callback) => request(url,"POST",body,callback)};
}