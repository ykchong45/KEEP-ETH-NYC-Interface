import { useEffect, useRef, useState } from 'react';
import Binance from 'binance-api-node';
import { createChart, CrosshairMode } from 'lightweight-charts';

const client = Binance();

export default function KpPriceChart(props) {
  const [pairName, setPairName] = useState('BTCUSDT');
  const [latestPrice, setLatestPrice] = useState(0);
  useEffect(() => {
    if (props.token) setPairName(`${props.token}USDT`);
  }, [props.token]);

  // chart creation
  // full example (without realtime data): https://codesandbox.io/s/9inkb?file=/src/index.js
  const chart = useRef();
  const chartContainerRef = useRef();
  const candleSeries = useRef();

  useEffect(() => {
    if (chart.current) return;

    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#0e1118',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
      },
    });

    console.log(chart.current);

    candleSeries.current = chart.current.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    });
  }, []);

  useEffect(() => {
    console.log('debug chart: currentChart ', chart);
    if (!chart.current) {
      return;
    }

    const resizeChart = () => {
      chart.current.resize(
        chartContainerRef.current.offsetWidth,
        chartContainerRef.current.offsetHeight,
      );
      console.log(
        'debug chart: resize ',
        chartContainerRef.current.offsetHeight,
        chartContainerRef.current.offsetWidth,
      );
    };
    resizeChart();
    window.addEventListener('resize', resizeChart);
    return () => window.removeEventListener('resize', resizeChart);
  }, [chart]);

  const formatOHLC = (datas) => {
    console.log('formatohlc ', datas);
    if (!Array.isArray(datas)) datas = [datas];
    return datas.map((data) => ({
      time: data.openTime || data.startTime,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
    }));
  };

  // binance data subscription
  // cleaner is a function to unsubscribe a previous subscription

  const cleaner = useRef();
  useEffect(() => {
    if (cleaner.current) {
      // unsubscribe from previous subscription
      console.log('cleaned previous subscriber: ', cleaner.current);
      cleaner.current();
      // clear chart candles
      candleSeries.current.setData([]);
    }

    // subscribe to websocket for the future price update
    const clean = client.ws.candles(pairName, '1m', (res) => {
      console.log('res: ', res);
      const candleData = {
        time: res.startTime,
        open: res.open,
        high: res.high,
        low: res.low,
        close: res.close,
      };
      console.log(candleData.time, candleData.close);
      candleSeries.current.update(candleData);
      setLatestPrice(res.close);
      console.log('latestPrice: ', res.close);
    });
    cleaner.current = clean;
    console.log('added new candles subscription for ', pairName);

    const fetchPrevAndSubscribe = async () => {
      // before subscribe to websocket, should prefill the chart with existing history, this can be fetched with normal REST request
      // SHOULD DO THIS BEFORE SUBSCRIBE, HOWEVER MOVING SUBSCRIBE TO AFTER THIS BLOCK OF CODE WILL CAUSE THE SUBSCRIPTION GOES ON FOREVER
      // REACT BUG?
      const now = Date.now();
      let prevData = await client.candles({
        symbol: pairName,
        interval: '1m',
        limit: 1000,
        endTime: now,
      });
      prevData = formatOHLC(prevData);
      console.log('prev data: ', prevData);
      candleSeries.current.setData(prevData);
    };

    fetchPrevAndSubscribe();
  }, [pairName]);

  return (
    <div className="App">
      <div>{pairName.substring(0, pairName.length - 4)}/USDT</div>
      <h2>{latestPrice}</h2>
      <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />
    </div>
  );
}
