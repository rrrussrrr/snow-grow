const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const tickerCloseDataRouter = require('./controllers/ticker_close_datapoints')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/ticker', tickerCloseDataRouter)


module.exports = app
