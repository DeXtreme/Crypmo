import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';

function Pair({ticker, blockchain, 
               price, volume, change}){

    let [lastPrice, setLastPrice] = useState(null);
    let [isDown, setDown] = useState(null);

    useEffect(()=>{
        if(lastPrice !== null && price !== lastPrice){
            setDown(price < lastPrice)
        }
        setLastPrice(price);
    },[price,setLastPrice]);


    const formatPrice = (value) => {
        return value.toLocaleString('en-US', 
            { minimumFractionDigits : 4}) 
    }

    const formatVolume = (value) => {
        return value.toLocaleString('en-US') 
    }

    const formatChange = (value) => {
        return value.toLocaleString('en-US', 
            { minimumFractionDigits : 2}) 
    }

    let signedChange = (change > 0 ? "+" : "") + `${formatChange(change)}%`

    return(
        <div className='grid auto-cols-fr grid-rows-1 p-4 hover:bg-secondary'>
            <div className='col-start-1 flex items-center'>
                <img src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${ticker.toLowerCase()}.svg`} 
                className='rounded-full w-9 h-9' alt={ticker[0]}/>
                <div className='ml-2'>
                    <p className='font-medium text-sm'>{ticker.toUpperCase()} <span className='text-xs font-bold text-gray-500'>/GHS</span></p>
                    <p className='text-xs text-gray-500 font-medium md:hidden'>Vol {formatVolume(volume)}</p>
                    <p className='text-xs text-gray-500 font-medium hidden md:block'>{blockchain}</p>
                </div>
                
            </div>
            <div className='hidden md:flex col-start-2 items-center justify-center'>
                <p className={`font-medium text-sm
                 ${ (isDown !== null) ? (isDown) ? "text-red-500" : "text-green-500" : ""}`}>
                    {formatPrice(price)}
                </p>
            </div>
            <div className='hidden md:flex col-start-3 justify-center flex-col items-center'>
                <p className=' font-medium text-sm'>{volume}</p>
                <p className=' text-xs font-medium text-gray-500'>{formatVolume(volume * price)}</p>
            </div>
            <div className='col-start-2 md:col-start-4 flex flex-col items-end justify-center'>
                <p className={`md:hidden font-medium text-sm
                 ${ (isDown !== null) ? (isDown) ? "text-red-500" : "text-green-500" : ""}`}>
                    {formatPrice(price)}
                </p>
                <p className={`text-sm font-medium 
                 ${(change!== 0) ? (change > 0) ? "text-green-500" : "text-red-500" : "text-gray-400"}`}>
                    {signedChange}
                </p>
            </div>
        </div>
    );
}

Pair.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    ticker: PropTypes.string,
    blockchain: PropTypes.string,
    price: PropTypes.number,
    volume: PropTypes.number,
    change: PropTypes.number
}

export default Pair;