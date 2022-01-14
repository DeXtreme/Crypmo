import { API_URL } from "../constants";
import { ServerError } from "../errors";

export async function apiRequest(url, method, body){

    let response = await fetch(`${API_URL}/${url}`, 
                                {method: method,
                                headers: {
                                    'Content-Type' : "application/json"
                                },
                                body: JSON.stringify(body)})
                                .catch(e =>{
                                    throw e;
                                });
    
    if(response.statusCode === 500){
        throw new ServerError()
    }

    return response
}