import Clock from "./Clock"
import { useState, useEffect } from 'react'
import { getDate, getDayAndTime, getFlags } from '../utils/utils.js';
import { DateTime } from 'luxon';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import axios from "axios"

//colours
const NIGHT_BG = 'linear-gradient(to top, #11a9a9 0%, #330867 100%)'
const NIGHT_COL = 'rgb(248,244,255)'
const DAY_BG= 'linear-gradient(-225deg, #c9ffe7 0%, #aeedf0 48%, #9deaff 100%)'
const DAY_COL = 'rgb(56,56,56)'

// region
const region = new Intl.DisplayNames(['en'], {type: 'region'});

export default function ClockBox ({city, viewArray, setViewArray}) {

    const [daylight, setDaylight] = useState({})
    const [night, setNight] = useState(null)
    const [digitalTime, setDigitalTime] = useState("")

    //fetch
    useEffect( () => {
        getDaylight(city.coordinates.lat, city.coordinates.lon, city.timezone)
    },[])

    // update digital time
    useEffect( () => {
        setDigitalTime(getDayAndTime(city.timezone))
        const timer = setInterval(() => setDigitalTime(getDayAndTime(city.timezone)), 100)
        return () => {clearInterval(timer)}
    }, [setDigitalTime])


    // update background by daylight
    useEffect( () => {
        dayOrNight(city)
        const lightTimer = setInterval(() => dayOrNight(city), 60000)
        return () => {clearInterval(lightTimer)}
    }, [daylight, setNight, night])

    /* get sunset and sunrise time */
    const getDaylight = (lat, long, tz) => {
        fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}`)
            .then(response => response.json())
            .then(data => {
                var sunrise = DateTime.fromFormat(`${getDate(tz)} ${data.results.sunrise} ${tz}`, `yyyy-MM-dd tt z`);
                var sunset = DateTime.fromFormat(`${getDate(tz)} ${data.results.sunset} ${tz}`, `yyyy-MM-dd tt z`);
                setDaylight({sunrise, sunset})
            })
            .catch(err=> console.log(err))   
    }

    /* Determine if there is daylight */
    const dayOrNight = (city) => {
        var now = DateTime.now();
        let col;
        if (daylight.sunset && daylight.sunrise) {
            //day
            if (now > daylight.sunrise && now < daylight.sunset ) {
                setNight(false)
                col = DAY_COL
            //night
            } else if (now < daylight.sunrise || now > daylight.sunset) {
                setNight(true)
                col = NIGHT_COL
            }
        }
        d3.select(`#clockbox-${city._id} .clock`).selectAll("line").attr("stroke", col)
        d3.select(`#clockbox-${city._id} .clock`).select("svg").selectAll("text").attr("font-color",col)
        d3.select(`#clockbox-${city._id} .clock`).selectAll("text").attr("fill", col)
        d3.select(`#clockbox-${city._id} .clock`).select(".centre").attr("fill", col).attr("stroke", col)
    }

    /* delete items to be displayed */
    const deleteItem = (id) => {
        axios.delete(`/api/${id}`)
        .then(res => setViewArray(viewArray.filter((item ) => city._id !== item._id)))
        .catch(err => console.log(err.message))
    }
        

    return ( night !== null ?
        <div className="clockbox" 
        id={`clockbox-${city._id}`}
        style={{ backgroundImage: night? NIGHT_BG : DAY_BG }}>
            <div className="city" 
            style={{ color: night? NIGHT_COL : DAY_COL }}>{city.name}</div>
            <div className="country" 
            style={{ color: night? NIGHT_COL : DAY_COL }}>
                {city.country === undefined ? (region.of(city.country_code))
                : city.country} 
           </div>
            <Clock city = {city}/>
            <div className="digital"
            style={{ color: night? NIGHT_COL : DAY_COL }}>{digitalTime}</div>
            <div className="delete-button"
            style={{ color: night? NIGHT_COL : DAY_COL }}
            onClick={()=>deleteItem(city._id)}>&times;</div>
        </div>
        : null
    )
}