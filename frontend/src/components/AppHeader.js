import {useState, useEffect} from 'react'

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



import LoginForm from './LoginForm'

import AppBar from '@mui/material/AppBar'



import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



const AppHeader = (
    {user, 
    handleLogin,
    handleLogout
    }
    ) => {


    const [userNameInput, setUserNameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [loginVisible, setLoginVisible] = useState(false);

    useEffect(() => {
        if (user) {
            setLoginVisible(false)
        }
      }, [user])

    const handleFormUserNameChange = (e) => {
        setUserNameInput(e.target.value);
    }

    const handleFormPasswordChange = (e) => {
        setPasswordInput(e.target.value);
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
    
        handleLogin(userNameInput, passwordInput);
        setPasswordInput("")
        setUserNameInput("")
      }

    return (

        <AppBar position="static">
        <Toolbar>
          { loginVisible ?
            null
            :
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
          }
          { loginVisible ?
            null
            :
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SnowGrow
            </Typography>
          }
          { user || loginVisible ?
            null
            :
            <Button onClick={() => setLoginVisible(true)}color="inherit">Login Form</Button>
          }
          { user || loginVisible ?
            null
            :
            <Button color="inherit">Sign Up</Button>
          }
          { !user && loginVisible ? 
            <LoginForm 
            userName={userNameInput}
            password={passwordInput}
            onChangeUserName={handleFormUserNameChange}
            onChangePassword={handleFormPasswordChange}
            buttonText="Login"
            onSubmit={handleLoginSubmit}
            />
            : 
            null
          }
          { !user && loginVisible ?
            <Button onClick={() => setLoginVisible(false)}color="inherit">Cancel</Button>
            :
            null
          }
          { user ?
            <Button onClick={handleLogout} color="inherit">Log Out</Button>
            :
            null
          }
        </Toolbar>
      </AppBar>
    )
}

export default AppHeader;