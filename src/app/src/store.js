import { createStore, combineReducers} from 'redux';

import accountSlice from './slices/account';
import alertSlice from './components/Alert/slices';


let reducers = combineReducers({
    account: accountSlice.reducer,
    alert: alertSlice.reducer,
})

export const store = createStore(reducers);
