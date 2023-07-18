const mongoose = require('mongoose')
// const insertData = require('./insertData');
// const dotenv = require('dotenv').config();

//db connect
const connect = async () => {
    mongoose.connect(process.env.ATLAS_URI);
    const database = mongoose.connection

    database.on('error', (error) => {
        console.log(error)
        process.exit(1)
    })
    
    database.once('connected', () => {
        console.log('DB connected: ', database.host, database.name);
    })

}

module.exports = connect
// connect();
// insertData();
