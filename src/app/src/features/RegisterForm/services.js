import { apiRequest } from "../../services";

export async function register({email, password}){
   
    const data = {email: email, password: password};

    let response = await apiRequest("account/", "POST", data)
                            .catch(e => {
                                console.debug(e);
                                return null;
                            });
    
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