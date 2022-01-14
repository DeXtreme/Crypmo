import { apiRequest } from "../../services";

export async function verifyAccount(verify_id){
    let response = await apiRequest(`account/verify/${verify_id}`,"GET")
                        .catch(e =>{
                            console.debug(e);
                            return null;
                        })
                    
    let result = false;

    if(response?.ok){
        result = true;
    }

    return result;
}