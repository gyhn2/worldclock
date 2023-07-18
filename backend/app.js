const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');

const dotenv = require('dotenv').config();
const connect = require('./init')
const insertData = require('./insertData');
const CityModel = require('./models/cityModel');
const GeodataModel = require('./models/geodataModel');

const NUM_RESULTS = 10
const MAX_LENGTH = 12

connect();
insertData();
  
app.use(cors())
app.use(express.json());
app.set('trust proxy', 1);

//fetch queries
app.get('/api/query/:q', async (req, res) => {
    try {
        let query = req.params.q.replace(/ /g, '[ ,-]')
        const results = await GeodataModel
            .find(
            {
                $or: [ 
                    { ascii_name: 
                        { 
                            $regex: `^${query}`, $options: 'i' 
                        }
                    },
                    {
                        name: {
                            $regex: `^${query}`, $options: 'i'          
                        }
                    }
                    //search by country
                    ,{ 
                        cou_name_en: {
                            $regex: `^${query}`, $options: 'i' 
                        }
                    }
                ]
            }
            )
            .sort( { population: -1 } )
            // .limit( NUM_RESULTS )
        res.status(200).send(results)
    } catch (err) {
        res.status(400).send(err)
    }

})

// insert selected city
app.post('/api', async (req, res) => {
    const city = new CityModel({
        name: req.body.name,
        country_code: req.body.country_code,
        population: req.body.population,
        timezone: req.body.timezone,
        coordinates: req.body.coordinates,
    })

    try {
        const ids = await CityModel.distinct('_id')
        //maximum length: delete first item
        if ( ids.length === MAX_LENGTH) {
            const firstItem = await CityModel.findByIdAndDelete(ids[0])
        }
        const saved = await city.save();
        res.status(200).json(saved)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})  

//fetch selected cities
app.get('/api', async (req, res) => {
    try{
        res.status(200).json(await CityModel.find())
    } catch (err) {
        res.status(400).json({message: error.message})
    }
})

//delete selected cities
app.delete('/api/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const toDel = await CityModel.findByIdAndDelete(id)
        res.status(200).send({message: id})
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

