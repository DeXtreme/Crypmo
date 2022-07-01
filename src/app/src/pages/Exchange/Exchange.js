import { Outlet } from 'react-router-dom';
import Navbar from '../../layouts/Navbar/Navbar';

function Exchange(){

    return(
        <>
            <Navbar />
            <div className='pt-24'>
                <Outlet />
            </div>
        </>
    );
}

export default Exchange;