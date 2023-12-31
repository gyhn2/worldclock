# worldclock

A responsive world clock web application built with React + Express + MongoDB + D3. Consuming geodata and weather APIs to display analog and digital clocks for over 10000 cities.

* [Demo](https://worldclock-frontend.vercel.app/)

<img width="700" alt="SSHOT" src="https://github.com/gyhn2/worldclock/assets/80073085/49905270-2f8a-4d45-856d-6001fdad14a7">


## Installation
1. Set your MongoDB connection string as environment variable for the backend server.
e.g. In `.env` file under the `backend` directory,
```bash
   ATLAS_URI=mongodb+srv://<username>:<password>@<host>/<database>?<options>
```

2. In the root directory, install dependencies and run the app 
```bash
npm install
npm run start
```

3. On the MongoDB Atlas website, go to the "Search" tab on your database. Then create a search index on the 'geodatas' collection, using the JSON Editor: 

```
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "ascii_name": [
        {
          "foldDiacritics": true,
          "tokenization": "edgeGram",
          "type": "autocomplete"
        },
        {
          "type": "string"
        }
      ],
      "cou_name_en": [
        {
          "foldDiacritics": true,
          "tokenization": "edgeGram",
          "type": "autocomplete"
        },
        {
          "type": "string"
        }
      ],
      "name": {
        "foldDiacritics": true,
        "tokenization": "edgeGram",
        "type": "autocomplete"
      }
    }
  }
}
```

4. When the database is initialized and the geodata file is read and inserted into DB, the app will be accessible at http://localhost:3000

* Frontend: `http://localhost:3000`
* Backend: `hhtp://localhost:4000`

## Functionalities

* Animated analog clocks visualized with trigonometry and timezone API
* Search functionality, with auto-suggestions returning queries sorted by city population size
* Current daylight information: lighter background = daylight, darker = nighttime
* Persist queried data into MongoDB (max 12 items) 
* Delete button for erasing persisted queries

## Framework + Programs + Libraries

* React.js
* Express.js
* Node.js
* D3.js
* MongoDB
* Mongoose
* Axios

## API
* [Daylight info: Sunset and Sunrise Times API](https://sunrisesunset.io/api/)

* [Geodata by GeoNames (CC BY 4.0)](https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/information/?disjunctive.cou_name_en&sort=population)


## Mobile view
<img width="300" alt="mobile screenshot" src="https://github.com/gyhn2/worldclock/assets/80073085/6af66fc4-7fb7-47c9-a985-13d65d368afd">

