import { createStore, combineReducers} from 'redux';
import { createSlice } from '@reduxjs/toolkit';

import alertSlice from './components/Alert/slices';

const accountSlice = createSlice({
    name: "account",
    initialState:{username: null,
            access: null,
            refresh: null},
    reducers: {
        login(state, action){
            let access = action.payload.access;
            let refresh = action.payload.refresh;
            let username = action.payload.username;
            return {...state, username, access, refresh};          
        }
    }
})

let reducers = combineReducers({
    account: accountSlice.reducer,
    alert: alertSlice.reducer,
})

export const accountActions = accountSlice.actions;
export const store = createStore(reducers);
