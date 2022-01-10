import { API_URL } from "../../constants"

export async function doRegister({email, password}){
    await new Promise(r => setTimeout(r, 5000));
    return true;
    const data = {email: email, password: password};

    let response = await fetch(`${API_URL}/account/register`, {
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