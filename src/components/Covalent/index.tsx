import { useState, useEffect } from 'react';

// Set your API key here
const APIKEY = 'ckey_9b64aafb1353438694743f2ef52';

// Set your crypto tickers here
const tickers = ['ETH', 'USDC', 'MATIC'];

// Set the Covalent API
const covalentAPI = 'https://api.covalenthq.com/v1';
const APIEndpoint = '/pricing/tickers';

// Covalent API request setup
const url = new URL(`${covalentAPI}${APIEndpoint}/`);
url.search = new URLSearchParams({
  key: APIKEY,
  tickers: tickers,
});

const usePriceFeed = () => {
  const [latestPrices, setLatestPrices] = useState({});

  const covalentTickerFetcher = async () => {
    // Use Fetch API to get Covalent data and display in token table
    const res = await fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let tokens = data.data.items;
        const priceDict = {};
        tokens.forEach((token) => {
          let tokenName = token.contract_ticker_symbol;
          if (tokenName == 'WETH') {
            tokenName = 'ETH';
          }
          priceDict[tokenName] = token.quote_rate;
        });
        setLatestPrices(priceDict);
      });

    setTimeout(covalentTickerFetcher, 10000);
    return res;
  };

  useEffect(() => {
    covalentTickerFetcher();
  }, []);

  return latestPrices;
};

export default usePriceFeed;
