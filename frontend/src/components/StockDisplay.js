import StockTab from "./StockTab"

const StockTable = ({stockList}) => {
    return (
        <div>
            {stockList.map(stock => 
                <StockTab stockData={stock}/>
            )}
        </div>
    )
}

export default StockTable