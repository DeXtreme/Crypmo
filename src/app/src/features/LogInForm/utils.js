import jwt_decode from 'jwt-decode';

export async function handleResponse(response){
    let result = null;

    if(response?.ok){
        let json = await response.json();
        let {access, refresh} = json;
        let decoded = jwt_decode(access);
        let username = decoded["username"];    
        result = {username, access, refresh};
    }

    return result;
}