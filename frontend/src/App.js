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

  const [stockTickers, setStockTickers] = useState([
    {ticker: "AAsPL"},{ticker:"GOOG"}
  ]);
  const [searchBarText, setSearchBarText] = useState([""]);

  const findTicker = (e) => {
    e.preventDefault();

    TickerRequestHandler
      .getTickerData(searchBarText)
      .then(returnedData => {
        // update ticker table
        setStockTickers([returnedData, ...stockTickers])
      })
      .catch(error => {
        console.log(error)
      })
      setSearchBarText("");
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
        onSubmit={findTicker}
      />
      <StockTable stockList={stockTickers}/>
      <Button>Cliq</Button>
    </div>
  );
}

export default App;
