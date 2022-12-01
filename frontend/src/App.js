import {useState, useEffect} from 'react'
import axios from 'axios'
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
    {ticker: "AAPL"},{ticker:"GOOG"},{ticker: "AAPL"},{ticker:"GOOG"},{ticker: "AAPL"},{ticker:"GOOG"},
    {ticker: "AAPL"},{ticker:"GOOG"},{ticker: "AAPL"},{ticker:"GOOG"},{ticker: "AAPL"},{ticker:"GOOG"},
    {ticker: "AAPL"},{ticker:"GOOG"},{ticker: "AAPL"},{ticker:"GOOG"},{ticker: "AAPL"},{ticker:"GOOG"}
  ]);



  return (
    <div className="App">

      <SearchBar buttonText="Search"/>
      <StockTable stockList={stockTickers}/>
      <Button>Cliq</Button>
    </div>
  );
}

export default App;
