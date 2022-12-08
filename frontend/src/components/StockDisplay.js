import StockTab from "./StockTab"

const StockTable = ({stockList, toggleFavorite, loggedIn}) => {
    return (
        <div>
            {stockList.map(stock => 
                <StockTab toggleFavorite={toggleFavorite} loggedIn={loggedIn} stockData={stock}/>
            )}
        </div>
    )
}

export default StockTable