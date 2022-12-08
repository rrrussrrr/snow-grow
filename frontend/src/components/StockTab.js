import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const StockTab = ({stockData, toggleFavorite, loggedIn}) => {
    return (
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {stockData.ticker}
          </Typography>
          <Typography variant="h5" component="div">
            {stockData.close}
          </Typography>
        </CardContent>
        <CardActions>
          {loggedIn ?
            <Button 
            size="small" 
            onClick={() => toggleFavorite(stockData.ticker)}
            >Learn More
          </Button>
          : null
          }
        </CardActions>
      </Card>
    )



}

export default StockTab