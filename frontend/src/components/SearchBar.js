import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const SearchBar = ({searchValue, onChange, onSubmit, hasButton = true, buttonText = ""}) => {
    return (
        <form onSubmit={onSubmit}>
         <TextField 
            value={searchValue}
            id="search-bar" 
            label="Ticker Input" 
            variant="outlined"
            onChange={onChange}
            // onSubmit={onSubmit}
         />  
        {hasButton ? <Button type="submit">{buttonText}</Button> : null}
        </form>

    )



}

export default SearchBar