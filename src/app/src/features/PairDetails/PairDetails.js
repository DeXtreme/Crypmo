import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAPI } from '../../hooks';
import { useKline } from '../../apisocket/hooks';
import { AiOutlineLineChart } from 'react-icons/ai'
import Chart from '../../components/Chart';

import slice from './slices';
import {handleResponse} from './utils';

function PairDetails({className, ticker}){

    let [isCandles, setCandles] = useState(true);

    let api = useAPI();
    let {subscribe, unsubscribe} = useKline();
    let dispatch = useDispatch();

    let pair = useSelector(state=> state.pairDetails.pair)
    let interval = useSelector(state=> state.pairDetails.interval)
    let data = useSelector(state=> state.pairDetails.candles)
    let end = useSelector(state=> state.pairDetails.end)
   
    let ndata = [
        { time: '2018-10-20 22:00:00', open: 56.09, high: 57.47, low: 56.09, close: 57.21 ,volume:123535},
        { time: '2018-10-20 21:00:00', open: 55.08, high: 55.27, low: 54.61, close: 54.98 ,volume:123535},
        { time: '2018-10-20 20:00:00', open: 54.62, high: 55.50, low: 54.52, close: 54.90 ,volume:123535},]
     /*   
     { time: '2018-10-19T22:00:00Z', open: 54.62, high: 55.50, low: 54.52, close: 54.90 ,amount:123535},
        { time: '2018-10-22T22:00:00Z', open: 55.08, high: 55.27, low: 54.61, close: 54.98 ,amount:123535},
        { time: '2018-10-23T22:00:00Z', open: 56.09, high: 57.47, low: 56.09, close: 57.21 ,amount:123535}
     { time: '2018-10-24', open: 57.00, high: 58.44, low: 56.41, close: 57.42 ,amount:123535},
        { time: '2018-10-25', open: 57.46, high: 57.63, low: 56.17, close: 56.43 ,amount:123535},
        { time: '2018-10-26', open: 56.26, high: 56.62, low: 55.19, close: 55.51 ,amount:123535},
        { time: '2018-10-29', open: 55.81, high: 57.15, low: 55.72, close: 56.48 ,amount:123535},
        { time: '2018-10-30', open: 56.92, high: 58.80, low: 56.92, close: 58.18 ,amount:123535},
        { time: '2018-10-31', open: 58.32, high: 58.32, low: 56.76, close: 57.09 ,amount:123535},
        { time: '2018-11-01', open: 56.98, high: 57.28, low: 55.55, close: 56.05 ,amount:123535},
        { time: '2018-11-02', open: 56.34, high: 57.08, low: 55.92, close: 56.63 ,amount:123535},
        { time: '2018-11-05', open: 56.51, high: 57.45, low: 56.51, close: 57.21 ,amount:123535},
        { time: '2018-11-06', open: 57.02, high: 57.35, low: 56.65, close: 57.21 ,amount:123535},
        { time: '2018-11-07', open: 57.55, high: 57.78, low: 57.03, close: 57.65 ,amount:123535},
        { time: '2018-11-08', open: 57.70, high: 58.44, low: 57.66, close: 58.27 ,amount:123535},
        { time: '2018-11-09', open: 58.32, high: 59.20, low: 57.94, close: 58.46 ,amount:123535},
        { time: '2018-11-12', open: 58.84, high: 59.40, low: 58.54, close: 58.72 ,amount:123535},
        { time: '2018-11-13', open: 59.09, high: 59.14, low: 58.32, close: 58.66 ,amount:123535},
        { time: '2018-11-14', open: 59.13, high: 59.32, low: 58.41, close: 58.94 ,amount:123535},
        { time: '2018-11-15', open: 58.85, high: 59.09, low: 58.45, close: 59.08 ,amount:123535},
        { time: '2018-11-16', open: 59.06, high: 60.39, low: 58.91, close: 60.21 ,amount:123535},
        { time: '2018-11-19', open: 60.25, high: 61.32, low: 60.18, close: 60.62 ,amount:123535},
        { time: '2018-11-20', open: 61.03, high: 61.58, low: 59.17, close: 59.46 ,amount:123535},
        { time: '2018-11-21', open: 59.26, high: 59.90, low: 58.88, close: 59.16 ,amount:123535},
        { time: '2018-11-23', open: 58.86, high: 59.00, low: 58.29, close: 58.64 ,amount:123535},
        { time: '2018-11-26', open: 58.64, high: 59.51, low: 58.31, close: 59.17 ,amount:123535},
        { time: '2018-11-27', open: 59.21, high: 60.70, low: 59.18, close: 60.65 ,amount:123535},
        { time: '2018-11-28', open: 60.70, high: 60.73, low: 59.64, close: 60.06 ,amount:123535},
        { time: '2018-11-29', open: 59.42, high: 59.79, low: 59.26, close: 59.45 ,amount:123535},
        { time: '2018-11-30', open: 59.57, high: 60.37, low: 59.48, close: 60.30 ,amount:123535},
        { time: '2018-12-03', open: 59.50, high: 59.75, low: 57.69, close: 58.16 ,amount:123535},
        { time: '2018-12-04', open: 58.10, high: 59.40, low: 57.96, close: 58.09 ,amount:123535},
        { time: '2018-12-06', open: 58.18, high: 58.64, low: 57.16, close: 58.08 ,amount:123535},
        { time: '2018-12-07', open: 57.91, high: 58.43, low: 57.34, close: 57.68 ,amount:123535},
        { time: '2018-12-10', open: 57.80, high: 58.37, low: 56.87, close: 58.27 ,amount:123535},
        { time: '2018-12-11', open: 58.77, high: 59.40, low: 58.63, close: 58.85 ,amount:123535},
        { time: '2018-12-12', open: 57.79, high: 58.19, low: 57.23, close: 57.25 ,amount:123535},
        { time: '2018-12-13', open: 57.00, high: 57.50, low: 56.81, close: 57.09 ,amount:123535},
        { time: '2018-12-14', open: 56.95, high: 57.50, low: 56.75, close: 57.08 ,amount:123535},
        { time: '2018-12-17', open: 57.06, high: 57.31, low: 55.53, close: 55.95 ,amount:123535},
        { time: '2018-12-18', open: 55.94, high: 56.69, low: 55.31, close: 55.65 ,amount:123535},
        { time: '2018-12-19', open: 55.72, high: 56.92, low: 55.50, close: 55.86 ,amount:123535},
        { time: '2018-12-20', open: 55.92, high: 56.01, low: 54.26, close: 55.07 ,amount:123535},
        { time: '2018-12-21', open: 54.84, high: 56.53, low: 54.24, close: 54.92 ,amount:123535},
        { time: '2018-12-24', open: 54.68, high: 55.04, low: 52.94, close: 53.05 ,amount:123535},
        { time: '2018-12-26', open: 53.23, high: 54.47, low: 52.40, close: 54.44 ,amount:123535},
        { time: '2018-12-27', open: 54.31, high: 55.17, low: 53.35, close: 55.15 ,amount:123535},
        { time: '2018-12-28', open: 55.37, high: 55.86, low: 54.90, close: 55.27 ,amount:123535},
        { time: '2018-12-31', open: 55.53, high: 56.23, low: 55.07, close: 56.22 ,amount:123535},
        { time: '2019-01-02', open: 56.16, high: 56.16, low: 55.28, close: 56.02 ,amount:123535},]*/

    useEffect(()=>{
        loadPair();
        return ()=> unsubscribe();
    },[])

    useEffect(()=>{
        if(pair){
            console.log("loading candles by effect")
            loadPairCandles();
        }
    },[pair])

    const loadPair = async()=>{
        console.log("loading pair")
        let result = await api.get(`exchange/${ticker}/`,handleResponse);
        if(result){
            dispatch(slice.actions.setPair(result))
            console.log("dispatch pair")
        }
    }

    const loadPairCandles = async()=>{
        console.log("loading candles", end)
        if(!end){
            let to = "";
            if(data.length>0){
                to = data[data.length-1].id;
            }
            let result = await api.get(`exchange/${pair.ticker}/candles/?interval=${interval}&to=${to}`,
                                    handleResponse);
            if(result && result.interval === interval){
                    dispatch(slice.actions.addCandles(result.candles));
                    subscribe(pair.id,interval,updateCandles)
            }
        }
    }

    const changeInterval = async (newInterval)=>{ 
        console.log("changing interval")
        if(newInterval !== interval){
            dispatch(slice.actions.setInterval(newInterval));
            unsubscribe();
            //loading candles
            let result = await api.get(`exchange/${ticker}/candles/?interval=${newInterval}`,
                                    handleResponse);
            
            if(result && result.interval === newInterval){
                dispatch(slice.actions.setCandles(result.candles));
                subscribe(pair.id, newInterval, updateCandles);
            }
        }
    }

    const updateCandles = (data)=>{
        dispatch(slice.actions.updateCandles(data));
    }

    return(
        <div className='grid grid-cols-6 grid-rows-2'>
            <div className='col-start-2 col-span-4 h-80 flex flex-col'>
                {/*pair info*/}
                <Chart isCandles={true} data={data} isCandles={isCandles}
                 loadPrevious={loadPairCandles} className="flex-1"/>
                <div className='bg-chart flex flex-row gap-3 text-xs 
                px-10 pt-2 pb-4 justify-end rounded-b-xl text-gray-400
                font-bold'>
                    <button onClick={()=>changeInterval("m1")}>M1</button>
                    <button onClick={()=>changeInterval("h1")}>H1</button>
                    <button onClick={()=>changeInterval("h4")}>H4</button>
                    <button onClick={()=>changeInterval("d1")}>D1</button>
                    <button onClick={()=>setCandles(prev=>!prev)}><AiOutlineLineChart /></button>
                </div>
            </div>
        </div>
    )
}

PairDetails.propTypes = {
    className: PropTypes.string,
    ticker: PropTypes.string,
}


export default PairDetails;

