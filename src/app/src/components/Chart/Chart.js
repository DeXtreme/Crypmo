import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { createChart, CrosshairMode } from 'lightweight-charts';


function Chart({className,isCandles,data,loadPrevious}){
    let chartRef = useRef(); 

    let [chart, setChart] = useState(null);
    
    let [candleSeries, setCandleSeries] = useState(null);
    let [areaSeries, setAreaSeries] = useState(null);
    let [volumeSeries, setVolumeSeries] = useState(null);

    let [legendCandle, setLegendCandle] = useState({})
    let [legendPrice, setLegendPrice] = useState("");
    let [legendVolume, setLegendVolume] = useState("");
    
    useEffect(()=>{
        let chart = createChart(chartRef.current,{
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            layout: {
                backgroundColor: '#131722',
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: {
                    color: 'rgba(42, 46, 57, 0)',
                },
                horzLines: {
                    color: 'rgba(42, 46, 57, 0.6)',
                },
            },
            timeScale : {
                timeVisible: true,
                secondsVisible: false
            }
        });

        let candleSeries = chart.addCandlestickSeries();

        var areaSeries = chart.addAreaSeries({
            topColor: 'rgba(38,198,218, 0.56)',
            bottomColor: 'rgba(38,198,218, 0.04)',
            lineColor: 'rgba(38,198,218, 1)',
            lineWidth: 2,
        });
        
        let volumeSeries = chart.addHistogramSeries({
            color: '#26a69a',
            priceFormat: {
                type: 'volume',
            },
            priceScaleId: '',
            scaleMargins: {
                top: 0.8,
                bottom: 0,
            },
        });
        
        chart.subscribeCrosshairMove((param) => {
            if (param.time) {
                if(isCandles){
                    const candle = param.seriesPrices.get(candleSeries);
                    setLegendCandle(candle);
                }else{
                    const price = param.seriesPrices.get(areaSeries);
                    setLegendPrice(price);
                }
                const volume = param.seriesPrices.get(volumeSeries);
                setLegendVolume(volume);
            }else{
                setLegendCandle({});
                setLegendVolume(null);
                setLegendPrice(null);
            }
        })

        const resizeHandler = ()=>{
            let width = chartRef.current.clientWidth
            let height = chartRef.current.clientHeight
            chart.resize(width, height);
        }

        window.addEventListener("resize", resizeHandler);

        setChart(chart);
        setAreaSeries(areaSeries);
        setCandleSeries(candleSeries);
        setVolumeSeries(volumeSeries);

    },[])

   useEffect(()=>{
        if(chart){
            chart.timeScale().unsubscribeVisibleLogicalRangeChange(rangeHandler);
            
            if(isCandles){
                areaSeries.setData([]);
                let candles = [...data]
                candleSeries.setData(candles);
            }else{
                candleSeries.setData([]);
                let values = data.map(candle=>{ 
                    return {time:candle.time, value:candle.close}
                })
                areaSeries.setData(values);
            }

            let volumes = data.map(candle=>{
                return {time:candle.time, value:candle.volume,
                    color: (candle.close>candle.open ? 'rgba(0, 150, 136, 0.8)' : 'rgba(255,82,82, 0.8)')}
            })
            volumeSeries.setData(volumes);

            chart.timeScale().subscribeVisibleLogicalRangeChange(rangeHandler);
        }
    },[data, isCandles])

    const rangeHandler = (range)=>{
        if(range && range.to === 1 && data.length>10 && chart){
            chart.timeScale().unsubscribeVisibleLogicalRangeChange(rangeHandler);
            loadPrevious();
        }
    }

    return(
        <div className={className}>
            <div className="bg-chart p-5 pb-0  rounded-t-xl w-full h-full">
                <div ref={chartRef} className="w-full h-full relative">
                    <div className='absolute top-0 left-0 z-10 text-gray-400'>
                        {isCandles ? 
                        <>
                            <p className="text-xs">O {legendCandle.open} H {legendCandle.high} L {legendCandle.low} C {legendCandle.close}</p>
                            <p className="text-xs">Volume {legendVolume}</p>
                        </>:
                        <>
                            <p className="text-xs" >{legendPrice} Volume {legendVolume}</p>
                        </>}
                    </div>
                </div>
            </div>
        </div>
    );
}

Chart.propTypes = {
    className: PropTypes.string,
    isCandles: PropTypes.bool,
    data: PropTypes.array,
}

Chart.defaultProps = {
    isCandles: true,
    data : []
}

export default Chart;