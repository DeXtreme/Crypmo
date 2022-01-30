import { } from 'react-icons/fa';
import Navbar from '../../layouts/Navbar/Navbar';
import { AiFillRobot } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function NotFound(){
    return (
        <>
        <Navbar showMenu={false}/>
        <div className="h-screen flex flex-col items-center justify-center px-10 text-center">
            <h1 className="font-bold text-9xl text-accent mb-4">4<span><AiFillRobot className='inline-block'/></span>4</h1>
            <p className='text-lg mb-16'> The page you are looking for cannot be found</p>
            <div>
                <Link to="/" className="bg-accent rounded-lg px-10 py-4 mb-4 transition-all 
                hover:bg-white hover:text-accent ">
                    <FaArrowLeft className='inline-block mr-4' />
                    Go Back
                </Link>
            </div>
        </div>
        </>
    );
}

export default NotFound;