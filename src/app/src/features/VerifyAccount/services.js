import { apiRequest } from "../../services";

export async function verifyAccount(response){

    let result = false;

    if(response?.ok){
        result = true;
    }

    return result;
}