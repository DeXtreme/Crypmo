import { createStore, combineReducers} from 'redux';

import AccountSlice from './slices/account';
import PairsSlice  from './slices/pairs';
import AlertSlice from './components/Alert/slices';


let reducers = combineReducers({
    account: AccountSlice.reducer,
    pairs: PairsSlice.reducer,
    alert: AlertSlice.reducer,
})

export const store = createStore(reducers);
