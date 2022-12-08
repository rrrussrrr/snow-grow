import {useState, useEffect} from 'react'
import axios from 'axios'
import TickerRequestHandler from './services/ticker_service'
import loginService from './services/login'

import StockTab from './components/StockTab';
import StockTable from './components/StockDisplay';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import SearchBar from './components/SearchBar'

import LoginForm from './components/LoginForm'



function App() {

  const [stockTickersData, setStockTickersData] = useState([]);
  const [searchBarText, setSearchBarText] = useState([""]);
  const [stockTickers, setStockTickers] = useState([]);

  // for login form
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  // on start, get favorite stocks from server for user/list of defaults


  //on start, get latest info for stocks in favorites/defaults

  useEffect(() => {
    // userService
    //   .getFavorites()
    //   .then(favorites => {
    //     setStockTickers(favorites)
    //   })
    // stockTickers.forEach(ticker => {
    //   console.log(ticker)
    //   // findTicker(ticker);
    // })
    testt();
  }, [stockTickers])
  

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
        console.log(stockTickersData)
      })
      .catch(error => {
        console.log(error)
      })

  }

  const testt = async () => {
    const result = await Promise.all(
      stockTickers.map(async (ticker) => {
        const data = await TickerRequestHandler.getTickerData(ticker);
        return data;
      })
    )

      setStockTickersData(result);

    // stockTickers.forEach(ticker => {
    //   TickerRequestHandler
    //   .getTickerData(ticker)
    //   .then(returnedData => {
    //     // update ticker table
    //     console.log(returnedData)
    //     result.push(returnedData)
    //     return 
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // })
    // console.log(result)
    // setStockTickersData([...result])
  }

  const getFavorites = () => {
    // if the logged in user has favorites, display them
  }

  const toggleFavorites = async (ticker) => {
    const newFaves = [...stockTickers].concat([ticker])
    try {
      const res = await loginService.update({
        favorites: newFaves
      }, user.username)

      setStockTickers(res.favorites)
    } 
    catch (exception) {
      console.log("error")
    }
  }

  const searchBarChange = (e) => {
    setSearchBarText(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username: userName, password:password
      })
      setUser(user)
      setUserName("")
      setPassword("")
      setStockTickers(user.favorites)
      //
      console.log(user)
      getFavorites();
    } 
    catch (exception) {
      console.log("error")
    }
    // TODO
  }

  return (
    <div className="App">

      <SearchBar 
        searchValue={searchBarText}
        onChange={searchBarChange} 
        buttonText="Search"
        onSubmit={handleSearchSubmit}
      />

      { !user ? 
        <LoginForm
        userName={userName}
        password={password}
        onChangeUserName={(e) => setUserName(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
        buttonText="Login"
        onSubmit={handleLogin}
        />
        : 
        <button onClick={() => setUser(null)}>Log out {user.username}</button>
      }

      <StockTable 
        stockList={stockTickersData} 
        loggedIn={user ? true : false}
        // toggleFavorite={toggleFavorite}
      />

      <Button>Cliq</Button>

    </div>
  );
}

export default App;
