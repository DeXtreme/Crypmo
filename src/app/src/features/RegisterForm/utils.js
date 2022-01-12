import { API_URL } from "../../constants"

export async function doRegister({email, password}){
   
    const data = {email: email, password: password};

    let response = await fetch(`${API_URL}/account/`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                        .catch(e => {
                            console.log(e);
                            return false;
                        });

    return response.ok;
}