export async function handleResponse(response){
    let result = null;

    if(response?.ok){
        try{
            result = await response.json();
        }catch(e){
            console.debug(e);
        }
    }

    return result;
}