import jwt_decode from 'jwt-decode';
import { store, accountActions } from '../../store';

export async function login(response){
    let result = false;

    if(response?.ok){
        let json = await response.json();
        let {access, refresh} = json;
        let decoded = jwt_decode(access);
        let username = decoded["username"];
        store.dispatch(accountActions.login({username, access, refresh}))
        result = true;
    }

    return result;
}