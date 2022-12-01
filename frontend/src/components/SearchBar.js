import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const SearchBar = ({onInput, onSubmit, hasButton = true, buttonText = ""}) => {
    return (
        <form>
         <TextField id="search-bar" label="Ticker Input" variant="outlined"
                    onInput={(e) => onInput(e.target.value)}/>  
        {hasButton ? <Button onSubmit={(e) => onSubmit()}>{buttonText}</Button> : null}
        </form>

    )



}

export default SearchBar