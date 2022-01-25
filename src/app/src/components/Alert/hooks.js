import { useDispatch } from 'react-redux';
import  alertSlice from './slices';
import * as cts from './constants';

export function useAlert(){
    let dispatch = useDispatch();

    return {
        showSuccessAlert(header,message){
            dispatch(alertSlice.actions.showAlert({type:cts.SUCCESS,header,message}));
        },
        showInfoAlert(header,message){
            dispatch(alertSlice.actions.showAlert({type:cts.INFO,header,message}));
        },
        showFailAlert(header,message){
            dispatch(alertSlice.actions.showAlert({type:cts.FAIL,header,message}));
        },
        showWarningAlert(header,message){
            dispatch(alertSlice.actions.showAlert({type:cts.WARNING,header,message}));
        },
        hideAlert(message){
            dispatch(alertSlice.actions.hideAlert({message}));
        }
    }
}
