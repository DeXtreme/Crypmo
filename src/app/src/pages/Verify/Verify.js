import { useParams } from 'react-router';
import Navbar from '../../layouts/Navbar/Navbar';
import VerifyAccount from '../../features/VerifyAccount/VerifyAccount';

export function Verify(props){
    let params = useParams();
    let verify_id = params.verify_id;
    return (
        <div>
            <Navbar fixed={false} showMenu={false}/>
            <VerifyAccount verify_id={verify_id} />
        </div>
    );
}