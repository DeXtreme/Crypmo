import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
    name: "alert",
    initialState: {type:null,
        header:null,
        message:null,
        show:false},
    reducers:{
        showAlert(state, action){
            return {...state,
                type:action.payload.type,
                header:action.payload.header,
                message:action.payload.message,
                show:true};
        },
        hideAlert(state, action){
            /* Use message as key to allow services to hide
               their own alerts*/
            let message = action.payload.message;
            if(state.message === message){
                return {...state, 
                    type:null,
                    header:null,
                    message:null, 
                    show:false};
            }
            return state;
        }
    }
})

export default alertSlice;
