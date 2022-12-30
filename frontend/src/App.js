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

import AppBar from '@mui/material/AppBar'


import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Grid from '@mui/material/Grid';

import AppHeader from './components/AppHeader';

function App() {

  const [stockTickersData, setStockTickersData] = useState([]);
  const [searchBarText, setSearchBarText] = useState([""]);
  const [stockTickers, setStockTickers] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  // for login form
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  const [loginVisible, setLoginVisible] = useState(false);

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

  // getting locally saved login data
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user)
      setStockTickers(user.favorites)
      console.log(user)
      getFavorites();
    }
  }, [])
  
  const searchBarChange = (e) => {
    setSearchBarText(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    //check if valid ticker
    if (searchBarText.length === 0) return
    if (stockTickers.includes(searchBarText)) {
      setSearchResult(null)
      setSearchBarText("");
      return
    }
    findTicker(searchBarText);
    setSearchBarText("");
  }

  // when searching for a ticker.  Will display the ticker's most recent info at the top of your list if a valid ticker
  const findTicker = (tickerName) => {
    TickerRequestHandler
      .getTickerData(tickerName)
      .then(returnedData => {
        // update ticker table
        //check if already contains

        setSearchResult(returnedData)
        

        // setStockTickersData([returnedData, ...stockTickersData])
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

  const toggleFavorite = async (ticker) => {
    console.log("toggling", ticker)
    // check if favorite exists already
    let newFaves = [];
    if (user.favorites.includes(ticker)) {
      //remove
      newFaves = user.favorites.filter(x => x !== ticker)
    } else {
      // add
      newFaves = [...user.favorites].concat([ticker])
    }
    console.log("newfaves", newFaves)
    try {
      const res = await loginService.update({
        favorites: newFaves
      }, user.username)
      console.log("res:", res)
      setUser(res)
      setStockTickers(res.favorites)
    } 
    catch (exception) {
      console.log("error")
    }
  }



  const handleLogin = async (userName, password) => {
    // e.preventDefault();

    try {
      const user = await loginService.login({
        username: userName, password:password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user)) 
      setUser(user)
      console.log("faves", user.favorites)
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null);
  }

  return (
    <div className="App">

     {/* <Grid container direction="column" justifyContent="center" spacing={1}>
      <Grid item>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar> */}
{/* 
      </Grid> */}
      {/* <Grid item>  */}
      {/* <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={loginVisible ? "hide" : "show"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SnowGrow
          </Typography>
          <Button className={loginVisible ? "hide" : "show"} color="inherit">Sign Up</Button>
          <Button className={loginVisible ? "hide" : "show"} onClick={() => setLoginVisible(true)}color="inherit">Login</Button>
          { !user ? 
        <LoginForm 
        className={loginVisible ? "show" : "hide"}
        userName={userName}
        password={password}
        onChangeUserName={(e) => setUserName(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
        buttonText="Login"
        onSubmit={handleLogin}
        />
        : 
        <button onClick={handleLogout}>Log out {user.username}</button>
      }
        </Toolbar>
      </AppBar> */}

      <AppHeader
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      >
      </AppHeader>

      <SearchBar 
        searchValue={searchBarText}
        onChange={searchBarChange} 
        buttonText="Search"
        onSubmit={handleSearchSubmit}
      />
      {/* </Grid> */}
      {/* <Grid item>  */}
      {/* </Grid>     
      <Grid item> */}
        { searchResult ? 
          <StockTab fave={false} user={user} toggleFavorite={toggleFavorite} loggedIn={user ? true : false} stockData={searchResult} />
          :
          null
        }
      {/* </Grid>
      <Grid item>  */}
      <StockTable 
        stockList={stockTickersData} 
        loggedIn={user ? true : false}
        toggleFavorite={toggleFavorite}
      />
      {/* </Grid>

     </Grid> */}



      {/* <SearchBar 
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
        toggleFavorite={toggleFavorite}
      /> */}



    </div>
  );
}

export default App;
