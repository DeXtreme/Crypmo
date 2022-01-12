import { API_URL } from "../../constants";

export async function verifyAccount(verify_id){
    let response = await fetch(`${API_URL}/account/verify/${verify_id}`,
                         {
                          method:"GET",
                          headers: {'Content-Type': 'application/json'}
                        }).catch(e =>{
                            console.debug(e);
                            return false;
                        })
    
    return response.status === 201;
}