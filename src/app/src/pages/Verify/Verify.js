import { useParams } from 'react-router';
import Navbar from '../../layouts/Navbar/Navbar';
import LogInForm from '../../features/LogInForm';
import VerifyAccount from '../../features/VerifyAccount';

export function Verify(props){
    let params = useParams();
    let verify_id = params.verify_id;
    return (
        <div>
            <Navbar fixed={false} showMenu={false}/>
            <VerifyAccount verify_id={verify_id} />
            <div className="flex justify-center items-center mt-20 px-6">
                <LogInForm />
            </div>
        </div>
    );
}