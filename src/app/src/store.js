import { createStore, combineReducers} from 'redux';

import AccountSlice from './slices/account';
import PairsSlice  from './slices/pairs';
import AlertSlice from './components/Alert/slices';
import PairDetailsSlice from './features/PairDetails/slices'


let reducers = combineReducers({
    account: AccountSlice.reducer,
    pairs: PairsSlice.reducer,
    alert: AlertSlice.reducer,
    pairDetails: PairDetailsSlice.reducer
})

export const store = createStore(reducers);
