import { Outlet } from 'react-router-dom';
import Navbar from '../../layouts/Navbar/Navbar';

function Exchange(){

    return(
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default Exchange;