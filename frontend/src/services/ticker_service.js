import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/tickers'

const getTickerData = (ticker) => {
  const request = axios.get(baseUrl + "/" + ticker)
  return request.then(response => response.data)
}


export default { 
  getTickerData
}