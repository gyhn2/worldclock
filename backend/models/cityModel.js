const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    name: {
        required: [true, 'City must have name'],
        type: String
    },
    country_code: {
        required: [true, 'City must have country'],
        type: String
    },
    timezone: {
        required: [true, 'City must have timezone'],
        type: String
    },
    coordinates : {
        lon: {
            required: true,
            type: Number
        },
        lat: {
            required: true,
            type: Number
        }
    },
    population: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('City', citySchema)
