import { useDispatch } from 'react-redux';
import  alertSlice from './slices';
import * as cts from './constants';

function useShowAlert(type){
    let dispatch = useDispatch();

    return (header,message) => {
        dispatch(alertSlice.actions.showAlert({type,header,message}));
    }
}

export function useSuccessAlert(){
    return useShowAlert(cts.SUCCESS);
}

export function useFailAlert(){
    return useShowAlert(cts.FAIL);
}

export function useWarningAlert(){
    return useShowAlert(cts.WARNING);
}

export function useInfoAlert(){
    return useShowAlert(cts.INFO);
}

export function useHideAlert(){
    let dispatch = useDispatch();

    return (message)=>{
        dispatch(alertSlice.actions.hideAlert({message}));
    };
}