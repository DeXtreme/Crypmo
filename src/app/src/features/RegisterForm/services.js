import { apiRequest } from "../../services";

export async function register(response){
   
    let result = {
        success: false
    }

    if(response){
        if(response.ok){
            result.success = true;
        }else if(response.status === 400){
            result.errors = await response.json();
        }
    }

    return result;
}