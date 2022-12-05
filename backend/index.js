const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const server = http.createServer(app);
const axios = require('axios')
const https = require ('node:https')
const fetch = require("node-fetch");
const TickerCloseData = require ('./models/tickerclosedata')
//
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

//store cache up to 2 weeks ago (previous monday)
// daily cache end of day
// check if today was trading day
// if so update

const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_PER_INTERVAL = {
  day: MILLISECONDS_IN_DAY,
  year: MILLISECONDS_IN_DAY * 365,
  week: MILLISECONDS_IN_DAY * 7,
  month: MILLISECONDS_IN_DAY * 30,
  hour: MILLISECONDS_IN_DAY / 24,
}


const dailyCacheGrab = (async () => {
    console.log("grabbing")


    const response = await fetch('https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2022-10-14?adjusted=true&include_otc=false&apiKey=76hxIfZRCopscD2ZGWchjaDppLYEjDvn');
    const data = await response.json();
    

    const formatted = await data.results.map(item => new TickerCloseData({
            ticker: item.T,
            volume: item.v,
            volumeWeightedAerage: item.vw,
            open: item.o,
            close: item.c,
            highest:item.h,
            lowest:item.l,
            timeStart: item.t,
            numOfTrades: item.n
          }))
        
            TickerCloseData.collection.insertMany(formatted);
});

// const intervalID = setInterval(dailyCacheGrab, 5000);

// setTimeout(() => {
//     console.log("clearing")
// clearInterval(intervalID)
// }, 15000)


//make periodic API call request

//check once

// axios
// .get('https://api.polygon.io/v1/open-close/AAPL/2022-10-14?adjusted=true&apiKey=FBY1RCAjzXNWT6sIyD9XntH6qpp1fWRn')
// .then(async (response) => {
//   const tickerData = new TickerCloseData({
//     ticker: response.data.symbol
//   })


//   try {
//     const savedData = await tickerData.save()
//     response.status(201).json(savedData);
//   } catch(exception) {

//   }
// })

// axios
// .get('https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2022-10-14?adjusted=true&include_otc=false&apiKey=76hxIfZRCopscD2ZGWchjaDppLYEjDvn')
// .then(async (response) => {

//   response.data.results.forEach(ticker => {
//     const tickerData = new TickerCloseData({
//       ticker: ticker.T
//     })
//     try {
//       const savedData = await tickerData.save()
//       response.status(201).json(savedData);
//     } catch(exception) {
//     }
//   })


// # 4
// axios
// .get('https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2022-10-14?adjusted=true&include_otc=false&apiKey=76hxIfZRCopscD2ZGWchjaDppLYEjDvn', {data: {}})
// .then(async (response) => {


//   // if (response.data.results) {
//   //   console.log(response.data.results)
//   // }
//   const formatted = response.data.results.map(item => new TickerCloseData({
//     ticker: item.T,
//     volume: item.v,
//     volumeWeightedAerage: item.vw,
//     open: item.o,
//     close: item.c,
//     highest:item.h,
//     lowest:item.l,
//     timeStart: item.t,
//     numOfTrades: item.n
//   }))

//   try {
//     TickerCloseData.collection.insertMany(formatted);
//   } catch(exception) {

//   }
//   // try {
//   //   const savedData = await tickerData.save()
//   //   response.status(201).json(savedData);
//   // } catch(exception) {

//   // }
// })

// axios
// .get('https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2022-10-14?adjusted=true&include_otc=false&apiKey=76hxIfZRCopscD2ZGWchjaDppLYEjDvn', (req, res) => {
//   console.log(res.data.results[0])
//   const formatted = res.data.results.map(item => new TickerCloseData({
//     ticker: item.T,
//     volume: item.v,
//     volumeWeightedAerage: item.vw,
//     open: item.o,
//     close: item.c,
//     highest:item.h,
//     lowest:item.l,
//     timeStart: item.t,
//     numOfTrades: item.n
//   }))
//   TickerCloseData.collection.insertMany(formatted);

// })

// function axiosGet() {
//   return axios.get('https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2022-10-14?adjusted=true&include_otc=false&apiKey=76hxIfZRCopscD2ZGWchjaDppLYEjDvn')

// }

// async function func  () {
//   let dddata = await axiosGet();
//   console.log(Object.keys(dddata.request))

// }

// axios
// .get('https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2022-10-14?adjusted=true&include_otc=false&apiKey=76hxIfZRCopscD2ZGWchjaDppLYEjDvn', {responseType: 'json'})
// .then(res => res.data)
// .then(data => {
//   console.log(data)
//   console.log(data.results[0])
//   const formatted = data.results.map(item => new TickerCloseData({
//     ticker: item.T,
//     volume: item.v,
//     volumeWeightedAerage: item.vw,
//     open: item.o,
//     close: item.c,
//     highest:item.h,
//     lowest:item.l,
//     timeStart: item.t,
//     numOfTrades: item.n
//   }))

// })

  // TickerCloseData.collection.insertMany(formatted);




  // if (response.data.results) {
  //   console.log(response.data.results)
  // }


//   try {
//     TickerCloseData.collection.insertMany(formatted);
//   } catch(exception) {

//   }
//   // try {
//   //   const savedData = await tickerData.save()
//   //   response.status(201).json(savedData);
//   // } catch(exception) {

//   // }
// })

/*

    ticker: {
        type: String,
        // required: true
    },
    volume: {
        type: Number,
        // required: true
    },
    volumeWeightedAerage: {
        type: Number,
        // required: true
    },
    open: {
        type: Number,
        // required: true
    },
    close: {
        type: Number,
        // required: true
    },
    highest: {
        type: Number,
        // required: true
    },
    lowest: {
        type: Number,
        // required: true
    },
    timeStart: {
        type: Number,
        // required: true
    },
    numOfTrades: {
        type: Number,
        // required: true
    }

*/
// })

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