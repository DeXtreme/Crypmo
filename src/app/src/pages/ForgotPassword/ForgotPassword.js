import ForgotForm from '../../features/ForgotForm';
import Navbar from '../../layouts/Navbar/Navbar';

function ForgotPassword(){
    return(
        <>
            <Navbar fixed={false} showMenu={false} />
            <div className='grid grid-cols-6 grid-rows-1'>
                <ForgotForm className="col-span-full px-6 py-10 
                md:col-start-2 md:col-span-4 
                lg:col-start-2 lg:col-span-2 lg:mt-10"/>
            </div>
        </>
    )
}

export default ForgotPassword;