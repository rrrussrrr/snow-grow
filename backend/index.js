const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const server = http.createServer(app);
const axios = require('axios')
const https = require ('node:https')


server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

//make periodic API call request

//check once

axios
.get('https://api.polygon.io/v1/open-close/AAPL/2022-10-14?adjusted=true&apiKey=FBY1RCAjzXNWT6sIyD9XntH6qpp1fWRn')
.then(response => {
  console.log(response.data)
})

// function httpGet(hostpath, chunkFunction) {
//   https.get(hostpath, (res) => res.on('data', chunkFunction));
// }

// function handleData (data) {
//   logger.info(data.headers)
// }

// httpGet('https://api.polygon.io/v1/open-close/AAPL/2022-10-14?adjusted=true&apiKey=FBY1RCAjzXNWT6sIyD9XntH6qpp1fWRn',
//   handleData
// )


//https://api.polygon.io/v1/open-close/AAPL/2022-10-14?adjusted=true&apiKey=FBY1RCAjzXNWT6sIyD9XntH6qpp1fWRn