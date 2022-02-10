import { createSlice } from "@reduxjs/toolkit";

const pairs = createSlice({
    name: "pairs",
    initialState : {},
    reducers: {
        addPairs(state, action){
            let pairs = {};
            action.payload.forEach((pair)=>{
                let {id,name,ticker,blockchain,
                     price,volume,change} = pair;

                pairs[ticker] = {id,name,blockchain,price,volume,change};
            })
            return {...state, ...pairs}
        },
        updatePair(state,action){
            let {id,name,ticker,blockchain,
                price,volume,change} = action.payload;

            let pairs = {...state}
            pairs[ticker] = {id,name,blockchain,price,volume,change}

            return {...state, ...pairs}
        }
    }
})

export default pairs;