import { useParams } from 'react-router-dom';
import ResetForm from '../../features/ResetForm';
import Navbar from '../../layouts/Navbar/Navbar';

function ResetPassword(){
    let {token} = useParams();
    return(
        <>
            <Navbar fixed={false} showMenu={false} />
            <div className='grid grid-cols-6 grid-rows-1'>
                <ResetForm className="col-span-full" token={token} />
            </div>
        </>
    )
}

export default ResetPassword;