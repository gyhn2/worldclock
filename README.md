# worldclock

A responsive world clock web application built with React + Express + MongoDB + D3. Consuming geodata and weather APIs to display analog and digital clocks for over 10000 cities.

[Demo](https://worldclock-frontend.vercel.app/)

<img width="700" alt="Screenshot 2023-07-18 at 7 26 58 PM" src="https://github.com/gyhn2/worldclock/assets/80073085/cbd3836b-f1ae-4fc0-8d11-b99e769cb8c2">


## Installation
1. Set your MongoDB connection string as environment variable for the backend server.
e.g. In `.env` file under the `backend` directory,
```bash
   ATLAS_URI=mongodb+srv://<username>:<password>@<host>/<database>?<options>
```

2. Install dependencies and run the app
```bash
npm install
npm run start
```

3. When the database is initialized and the geodata file is read and inserted into DB, the app will be accessible at http://localhost:3000

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
<img width="300" alt="mobile screenshot" src="https://github.com/gyhn2/worldclock/assets/80073085/1b6559cd-8276-4692-b447-8359f84e7e8b">

