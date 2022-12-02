const tickerCloseDataRouter = require('express').Router()
const TickerCloseData = require ('../models/tickerclosedata')

tickerCloseDataRouter.get('/', async (request, response) => {
    const ticker = {ticker: "test"}
    response.json(ticker);
  })

// Find ticker info on server (currently any matching)
tickerCloseDataRouter.get('/:tickername', async (request, response, next) => {
    const tickername = request.params.tickername.trim();
    console.log(tickername)
    const body = request.body
  
    TickerCloseData.findOne({ticker: tickername})
    .then(tickerData => {
      if (!tickerData) {
        return response.status(404).end();
      } else {
        response.json(tickerData)
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).send({error: 'malformatted ticker'})
    })
  })

  module.exports = tickerCloseDataRouter
