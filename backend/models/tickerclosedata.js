const mongoose = require('mongoose')

const tickerCloseDataSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    volumeWeightedAerage: {
        type: Number,
        required: true
    },
    open: {
        type: Number,
        required: true
    },
    close: {
        type: Number,
        required: true
    },
    highest: {
        type: Number,
        required: true
    },
    lowest: {
        type: Number,
        required: true
    },
    timeStart: {
        type: Number,
        required: true
    },
    numOfTrades: {
        type: Number,
        required: true
    }
})

/*

        {
            "T": "VAMO",
            "v": 757926,
            "vw": 27.5547,
            "o": 27.72,
            "c": 27.49,
            "h": 27.72,
            "l": 27.14,
            "t": 1665777600000,
            "n": 323
        },

*/