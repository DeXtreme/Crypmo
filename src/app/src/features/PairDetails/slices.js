import { createSlice } from "@reduxjs/toolkit";

const details = createSlice({
    name: "pairDetails",
    initialState: {
        pair: null,
        interval: "h1",
        candles:[],
        end:false
    },
    reducers:{
        setPair(state, action){
            let pair = action.payload;
            return({pair, interval:"h1", candles:[], end:false});
        },
        setInterval(state, action){
            let interval = action.payload;
            return({...state, interval})
        },
        setCandles(state, action){
            let data = action.payload;
            return({...state, candles:data, end:false})
        },
        addCandles(state, action){
            let data = action.payload;
            if(data.length === 0){
                return({...state, end:true})
            }
            return({...state, candles:[...state.candles, ...data]})
        },
        updateCandles(state, action){
            let candle = action.payload;
            let data = state.candles;
            let lastCandle = data[0];
            if(lastCandle.time === candle.time){
                data[0] = price;
            }else{
                data.unshift(price);
            } 
            return({...state, candles:data})
        },
    }
})

export default details;