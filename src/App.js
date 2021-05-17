import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './Coin.css';
import Coin from './Coin';
import ScrollToTop from './ScrollToTop';
import Modal from './Modal';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [coinInModal, setCoinInModal] = useState({});

  const getCoins = async () => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
        // console.log(res.data);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {

    getCoins()

    const interval = setInterval(() => {
      getCoins()
    }, 10000)

    return () => clearInterval(interval)

  }, []);


  const handleChange = e => {
    setSearch(e.target.value);
  };

  const showModal = (coin) => {
    setShow(true);
    setCoinInModal(coin);
  }

  const hideModal = (e) => {
    setShow(false);
  }



  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>



      <Modal coin={coinInModal} show={show} hideModal={hideModal} />
      {filteredCoins.map(coin => {
        return (

          <div key={coin.id} onClick={e => showModal(coin)}>
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              volume={coin.total_volume}
              marketcap={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
              showModal={showModal}
            />
          </div>
        );
      })}
      <ScrollToTop />
    </div>
  );
}

export default App;