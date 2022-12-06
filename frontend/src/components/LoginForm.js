import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const LoginForm = ({userName, password, onChangeUserName, onChangePassword, onSubmit, hasButton = true, buttonText = ""}) => {
    return (
        <form onSubmit={onSubmit}>
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
        {hasButton ? <Button type="submit">{buttonText}</Button> : null}
        </form>

    )



}

export default LoginForm