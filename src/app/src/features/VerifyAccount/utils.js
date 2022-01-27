export function handleResponse(response){

    let result = false;

    if(response?.ok){
        result = true;
    }

    return result;
}