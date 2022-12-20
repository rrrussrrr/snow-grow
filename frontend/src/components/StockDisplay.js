import StockTab from "./StockTab"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const StockTable = ({stockList, toggleFavorite, loggedIn}) => {
    return (
        <div>
            <Box>
                <Typography>
                    Your Stocks:
                </Typography>
            </Box>
            {stockList.map(stock => 
                
                <StockTab fave={true} toggleFavorite={toggleFavorite} loggedIn={loggedIn} stockData={stock}/>
            )}
        </div>
    )
}

export default StockTable