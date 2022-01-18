import PropTypes from 'prop-types'
import { FaCheckCircle, FaExclamationCircle, 
    FaTimesCircle, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

import './Alert.css';

function Alert({type, header, message, dismiss}){
    return (
        <div className="alert">
            <div className='flex items-center bg-secondary rounded-lg overflow-hidden max-w-screen-sm'>
                {type === Alert.SUCCESS && 
                <>
                    <div className='w-2 h-full bg-green-500 mr-4'></div>
                    <FaCheckCircle className='text-green-500 text-2xl'/>
                </>}
                {type === Alert.FAIL &&
                <>
                    <div className='w-2 h-full bg-red-500 mr-4'></div>
                    <FaTimesCircle className='text-red-500 text-2xl'/>
                </>}
                {type === Alert.WARNING && 
                <>
                    <div className='w-2 h-full bg-yellow-500 mr-4'></div>
                    <FaExclamationTriangle className='text-yellow-500 text-2xl'/>
                </>}
                {type === Alert.INFO && 
                <>
                    <div className='w-2 h-full bg-blue-500 mr-4'></div>
                    <FaExclamationCircle className='text-blue-500 text-2xl'/>
                </>}
            <div className='my-2.5 mx-5'>
                <h1 className='text-sm font-medium'>{header}</h1>
                <p className='text-sm'>{message}</p>
            </div>
            <button className="text-white cursor-pointer mr-5" onClick={dismiss}><FaTimes /></button>
            </div>
        </div>
    );
}

Alert.SUCCESS = "success";
Alert.FAIL = "fail";
Alert.WARNING = "warning";
Alert.INFO = "info";


Alert.propTypes = {
    type: PropTypes.oneOf([Alert.SUCCESS,
                           Alert.FAIL,
                           Alert.WARNING,
                           Alert.INFO]),
    header: PropTypes.string,
    message: PropTypes.string,
    dismiss: PropTypes.func
}

export default Alert;