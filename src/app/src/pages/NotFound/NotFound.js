import Navbar from '../../layouts/Navbar/Navbar';
import { AiFillRobot } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
function NotFound(){
    const navigate = useNavigate();
    return (
        <>
        <Navbar showMenu={false}/>
        <div className="h-screen flex flex-col items-center justify-center px-8 text-center">
            <h1 className="font-bold text-9xl text-secondary mb-4">4<span><AiFillRobot className='inline-block'/></span>4</h1>
            <p className='text-gray-500 mb-16'> The page you are looking for cannot be found</p>
            <button to="/" className="bg-accent rounded-lg px-8 py-4 mb-4 transition-all 
            hover:bg-white hover:text-accent text-sm" onClick={()=> navigate(-1)}>
                <FaArrowLeft className='inline-block mr-4' />
                Go Back
            </button>
        </div>
        </>
    );
}

export default NotFound;