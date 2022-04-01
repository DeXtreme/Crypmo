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
            data.reverse();
            return({...state, candles:data, end:false})
        },
        addCandles(state, action){
            let data = action.payload;
            let end = data.length < 10 ;

            data.reverse();
            return({...state, candles:[...data, ...state.candles], end})
        },
        updateCandles(state, action){
            let candle = action.payload;
            let data = state.candles;
            let lastCandle = data[data.length-1];
            if(lastCandle.time === candle.time){
                data[data.length-1] = candle;
            }else{
                data.push(candle);
            } 
            return({...state, candles:data})
        },
    }
})

export default details;