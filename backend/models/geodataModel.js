const mongoose = require('mongoose')
  
const geodataSchema = new mongoose.Schema({
    geoname_id: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String,
    },
    ascii_name: {
        required: true,
        type: String 
    },
    country_code: {
        required: true,
        type: String
    },
    cou_name_en: {
        required: false,
        type: String
    },
    timezone: {
        required: true,
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

module.exports = mongoose.model('Geodata', geodataSchema)
