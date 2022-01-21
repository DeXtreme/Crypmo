import { createStore, combineReducers} from 'redux';
import { createSlice } from '@reduxjs/toolkit';

import alertSlice from './components/Alert/slices';

const accountSlice = createSlice({
    name: "account",
    initialState:{username: null,
         token: null},
    reducers: {
        login(state, action){
            let token = action.payload.token;
            let username = action.payload.username;
            return {...state, username, token};          
        }
    }
})

let reducers = combineReducers({
    account: accountSlice.reducer,
    alert: alertSlice.reducer,
})

export const store = createStore(reducers);
