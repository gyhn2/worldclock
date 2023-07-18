# worldclock

A responsive world clock web application built with React + Express + MongoDB + D3, consuming geodata and weather APIs to display analog and digital clocks for over 10000 cities

## Installation
1. Set your MongoDB connection string as environment variable for the backend server.
e.g. In `.env` file,
```bash
   ATLAS_URI = #ATLAS_URI=#mongodb+srv://<username>:<password>@host/<database>?<options>
```

2. Install dependencies and run the app
```bash
npm install
npm run start
```

3. When geodata file is read and inserted into DB, the app will be accessible at http://localhost:3000

* Frontend: `http://localhost:3000`
* Backend: `hhtp://localhost:4000`

## Functionalities

* Animated analog clocks visualized with trigonometry and timezone API
* Search functionality, with auto-suggestions returning queries sorted by city population size
* Displays current daylight information. Lighter background = daylight, darker = nighttime
* Persist queried data in MongoDB

## Framework + Programs + Libraries

* React.js
* Express.js
* Node.js
* D3.js
* MongoDB

## API
