import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { flexbox } from '@mui/system'
import Box from '@mui/material/Box'

const StockTab = ({fave, stockData, toggleFavorite, loggedIn}) => {
  console.log(fave)
  const percentChange = Math.round(100 * (1 - (stockData.open / stockData.close)) * 10) / 10;
    return (
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {stockData.ticker}
          </Typography>

          {stockData.close > stockData.open ?           
            <Typography sx={{ color: "green"}} variant="h5" component="div">
              Close: {stockData.close}
              <div>Percent Change: {percentChange}%</div>
            </Typography>
          :
            <Typography sx={{ color: "red"}} variant="h5" component="div">
              Close: {stockData.close}
              <div>Percent Change: {percentChange}%</div>
            </Typography>
          }
        </CardContent>
        <CardActions>
          {loggedIn ?
            <Button 
            size="small" 
            onClick={() => toggleFavorite(stockData.ticker)}
            >{
              fave ? "Remove Favorite" : "Set Favorite"
            }
          </Button>
          : null
          }
        </CardActions>
      </Card>
    )



}

export default StockTab