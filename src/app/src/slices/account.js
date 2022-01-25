import { createSlice } from "@reduxjs/toolkit";

const account = createSlice({
    name: "account",
    initialState:{username: null,
            access: null,
            refresh: null,
            isLoggedIn: false},
    reducers: {
        login(state, action){
            let access = action.payload.access;
            let refresh = action.payload.refresh;
            let username = action.payload.username;
            return {...state, 
                username, 
                access, 
                refresh, 
                isLoggedIn:true};          
        },
        logout(state, action){
            return {...state,
                username:null, 
                access:null, 
                refresh:null, 
                isLoggedIn:false};
        }
    }
})

export default account;