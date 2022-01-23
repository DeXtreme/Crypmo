import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, 
    FaTimesCircle, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useHideAlert } from './hooks';
import * as cts from './constants';
import './Alert.css';

function Alert(){
    let type = useSelector(state => state.alert.type);
    let header = useSelector(state => state.alert.header);
    let message = useSelector(state => state.alert.message);
    let show = useSelector(state=> state.alert.show);

    let hideAlert = useHideAlert();
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            hideAlert(message);
        },5000);

        return ()=>{
            clearTimeout(timer);
        }
    },[message, hideAlert]);
    
    return (
        <>
            {show && 
            <div className="alert" key={message}>
                <div className='flex items-center bg-secondary rounded-lg overflow-hidden max-w-screen-sm'>
                    {type === cts.SUCCESS && 
                    <>
                        <div className='w-2 h-full bg-green-500 mr-4'></div>
                        <div>
                            <FaCheckCircle data-testid="icon" className='text-green-500 text-2xl'/>
                        </div>
                    </>}
                    {type === cts.FAIL &&
                    <>
                        <div className='w-2 h-full bg-red-500 mr-4'></div>
                        <div>
                            <FaTimesCircle data-testid="icon" className='text-red-500 text-2xl'/>
                        </div>
                    </>}
                    {type === cts.WARNING && 
                    <>
                        <div className='w-2 h-full bg-yellow-500 mr-4'></div>
                        <div>
                            <FaExclamationTriangle data-testid="icon" className='text-yellow-500 text-2xl'/>
                        </div>
                    </>}
                    {type === cts.INFO && 
                    <>
                        <div className='w-2 h-full bg-blue-500 mr-4'></div>
                        <div>
                            <FaExclamationCircle data-testid="icon" className='text-blue-500 text-2xl'/>
                        </div>
                    </>}
                <div className='my-2.5 mx-5'>
                    <h1 className='text-sm font-medium'>{header}</h1>
                    <p className='text-sm'>{message}</p>
                </div>
                <button data-testid="dismiss" className="text-white cursor-pointer mr-5" onClick={()=> hideAlert(message)}><FaTimes /></button>
                </div>
            </div>
        }
        </>
    );
}


export default Alert;