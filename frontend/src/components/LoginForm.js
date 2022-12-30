import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles.css'
const LoginForm = ({userName, password, onChangeUserName, onChangePassword, onSubmit, hasButton = true, buttonText = ""}) => {
    return (
        <form className="flex" onSubmit={onSubmit}>
         <TextField 
            value={userName}
            id="username" 
            label="Username" 
            variant="outlined"
            type="text"
            onChange={onChangeUserName}
            // onSubmit={onSubmit}
         />
         <TextField 
            value={password}
            id="password" 
            label="Password" 
            variant="outlined"
            type="password"
            onChange={onChangePassword}
            // onSubmit={onSubmit}
         /> 
        {hasButton ? <Button color="inherit" type="submit">{buttonText}</Button> : null}
        </form>

    )



}

export default LoginForm