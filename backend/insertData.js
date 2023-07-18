const fs = require('fs');
const geoData = JSON.parse(fs.readFileSync('./data/geo30000.json', 'utf-8'))
const GeodataModel = require('./models/geodataModel');

// insert geoData
const insertData = async () => {
    try {
        console.log("Drop previous data", await GeodataModel.deleteMany({}))
        console.log("Geodata creating...\nWait...")
        await GeodataModel.insertMany(geoData)
        console.log("Geodata created! \n Start!")
        // process.exit()
    } catch (error) {
        console.log("Geodata creation error", error)
    }
}

module.exports = insertData

