
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { usePairs, useAPI } from '../../hooks';
import { useTickers } from '../../apisocket';
import { useNavigate } from 'react-router-dom';
import {AiOutlineFileSearch} from 'react-icons/ai';

import Pair from '../../components/Pair';
import PairLoading from '../../components/PairLoading';

import * as cts from './constants';
import { handleResponse } from './utils';

function PairList({className}){
    let {pairs, addPairs, updatePairs} = usePairs();
    let [loading, setLoading] = useState(true);

    let api = useAPI();
    let tickers = useTickers();

    let goTo = useNavigate();

    const loadPairs = async () => {
        setLoading(true);

        /*
        setTimeout(()=>{
            addPairs([
                {id:1, name:"Ada", ticker: "ADA", 
                blockchain:"Cardano", price: 1.23,
                volume: 3420,change: 3.4},
                {id:2, name:"Bitcoin", ticker: "BTC", 
                blockchain:"Bitcoin", price: 244534,
                volume: 512,change: -2.3},
                {id:3, name:"Ethereum", ticker: "ETH", 
                blockchain:"Ethereum", price: 18673,
                volume: 649,change: -4.4},
                {id:4, name:"Tether", ticker: "USDT", 
                blockchain:"Ethereum", price: 6.6,
                volume: 12500,change: 0.02},
                {id:5, name:"Solana", ticker: "SOL", 
                blockchain:"Solana", price: 604,
                volume: 780,change: 5.6},
                {id:6, name:"Dogecoin", ticker: "DOGE", 
                blockchain:"Dogecoin", price: 1.23,
                volume: 100000,change: 7.9}
            ])
            setLoading(false);
        },5000);*/

        
        let result = await api.get("exchange/", handleResponse);
        if(result){
            addPairs(result); 
            tickers.subscribe("market", (data)=> updatePairs(data));
        }
        setLoading(false); 
    }
    
    useEffect(()=> {
        if(Object.keys(pairs).length == 0){
            loadPairs();
        }
    },[]);

    return(
        <div className={className}>

            {(Object.keys(pairs).length > 0) ? <div>
                <div className='grid auto-cols-fr grid-rows-1-4 mb-2 px-4'>
                    <div className="col-start-1 text-center font-medium text-xs text-gray-500">
                        Name/Volume
                    </div>
                    <div className='col-start-2 text-center font-medium text-xs text-gray-500'>
                        Price
                    </div>
                    <div className='hidden md:block col-start-3 text-center font-medium text-xs text-gray-500'>
                        24h Volume
                    </div>
                    <div className='col-start-3 md:col-start-4 text-center font-medium text-xs text-gray-500'>
                        24h Change
                    </div>
                </div>
                {Object.keys(pairs).map(ticker => {
                    return (
                        <Pair onClick={()=>goTo(`/exchange/pairs/${ticker}`)} ticker={ticker} 
                        key={pairs[ticker].id} {...pairs[ticker]}/>
                    )
                })}
            </div>:

            (loading) ? 
            <div>
                <div className='grid auto-cols-fr grid-rows-1 mb-2 px-4'>
                    <div className="col-start-1">
                        <div className='w-16 h-4 bg-secondary rounded-full m-auto' />
                    </div>
                    <div className='col-start-2 text-center font-medium text-xs text-gray-500'>
                        <div className='w-16 h-4 bg-secondary rounded-full m-auto' />
                    </div>
                    <div className='hidden md:block col-start-3 text-center font-medium text-xs text-gray-500'>
                        <div className='w-16 h-4 bg-secondary rounded-full m-auto' />
                    </div>
                    <div className='col-start-3 md:col-start-4 text-center font-medium text-xs text-gray-500'>
                        <div className='w-16 h-4 bg-secondary rounded-full m-auto' />
                    </div>
                </div>
                {Array(5).fill(null).map((_,i)=> <PairLoading key={i}/>)}
                
            </div>: 
            <div className='flex justify-center'>
                <div className='text-center px-12 mt-20'>
                    <AiOutlineFileSearch className='text-secondary m-auto text-9xl mb-4'/>
                    <p className='mb-10 text-gray-500'>{cts.NO_PAIRS_MESSAGE}</p>
                    <button onClick={loadPairs} className='bg-accent py-4 px-8 rounded-lg 
                    hover:bg-white hover:text-accent transition-all text-sm'>
                        Refresh
                    </button>
                </div>
            </div>
        }
        </div>
    )
}


PairList.propTypes = {
    className: PropTypes.string
}

export default PairList;