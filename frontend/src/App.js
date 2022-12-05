import {useState, useEffect} from 'react'
import axios from 'axios'
import TickerRequestHandler from './services/ticker_service'


import StockTab from './components/StockTab';
import StockTable from './components/StockDisplay';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import SearchBar from './components/SearchBar'



function App() {

  const [stockTickersData, setStockTickersData] = useState([]);
  const [searchBarText, setSearchBarText] = useState([""]);
  const [stockTickers, setStockTickers] = useState(["AAPL", "GOOG", "GE"]);
  // on start, get favorite stocks from server for user/list of defaults

  const defaultTickers = ["AAPL", "GOOG", "GE"];

  //on start, get latest info for stocks in favorites/defaults

  useEffect(() => {
    // userService
    //   .getFavorites()
    //   .then(favorites => {
    //     setStockTickers(favorites)
    //   })
    stockTickers.forEach(ticker => {
      console.log(ticker)
      findTicker(ticker);
    })
  }, [])
  

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    findTicker(searchBarText);
    setSearchBarText("");
  }

  const findTicker = (tickerName) => {
    TickerRequestHandler
      .getTickerData(tickerName)
      .then(returnedData => {
        // update ticker table
        setStockTickersData([returnedData, ...stockTickersData])
      })
      .catch(error => {
        console.log(error)
      })

  }

  const searchBarChange = (e) => {
    setSearchBarText(e.target.value)
  }


  return (
    <div className="App">

      <SearchBar 
        searchValue={searchBarText}
        onChange={searchBarChange} 
        buttonText="Search"
        onSubmit={handleSearchSubmit}
      />
      <StockTable stockList={stockTickersData}/>
      <Button>Cliq</Button>
    </div>
  );
}

export default App;
