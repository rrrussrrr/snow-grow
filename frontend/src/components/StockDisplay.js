import StockTab from "./StockTab"

const StockTable = ({faves, stockList, toggleFavorite, loggedIn}) => {
    console.log("faves", faves)
    console.log("cinlude?", faves.includes("GOOG"))
    return (
        <div>
            {stockList.map(stock => 
                
                <StockTab fave={true} toggleFavorite={toggleFavorite} loggedIn={loggedIn} stockData={stock}/>
            )}
        </div>
    )
}

export default StockTable