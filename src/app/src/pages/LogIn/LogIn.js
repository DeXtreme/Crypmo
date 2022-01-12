import { useParams } from 'react-router';
import Navbar from '../../layouts/Navbar/Navbar';
import Verify from '../../features/VerifyAccount/VerifyAccount';

export function LogIn(props){
    let params = useParams();
    console.debug(params)
    let verify = params.hasOwnProperty("verify_id");
    return (
        <div>
            <Navbar fixed={false} showMenu={false}/>
            {verify && <Verify verify_id={params.verify_id} />}
        </div>
    );
}