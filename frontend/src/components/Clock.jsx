import { useRef, useEffect } from 'react'
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { getHours, getMinutes, getSeconds } from '../utils/utils.js';

/* d3 clock variables */
var W = 280,
H = W,
C = W/2,
RADIUS = (W - W/8)/2,
LABEL_RADIUS = (W - W/3.2)/2,
TICK_RADIUS = RADIUS*130/140,
HOUR_RADIUS = W/4,
MIN_RADIUS = W/2.6,
SEC_RADIUS = W/2.5,
YOFFSET = W/40,
PI = Math.PI;
const HOUR_NUM = [
    "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2"
]

export default function Clock ({city}) {
    const ref = useRef(null);
    const tz = city.timezone;

    //draw clock face
    useEffect( () => {
        var clock = d3
        .select(ref.current)
        .attr("width", W)
        .attr("height", H);

        labelHours(clock)
        hourTicks(clock)
        minutesTicks(clock)
        centreDot(clock)
        const timer = setInterval(() => rotateHands(radians(tz)), 100)
        hands(radians(tz))

        clock.selectAll("*").attr("shape-rendering", "geometricPrecision")

        return () => clearInterval(timer);

    },[ref])

    //hours labels
    const labelHours = (clock) => {
        var hours = clock.selectAll(".hours")
        .data(HOUR_NUM).enter()
        .append("text")
        .attr("class", "hours")
        .attr("x", function(d, i) {
            return LABEL_RADIUS * Math.cos(i * PI/6) + C;
        })
        .attr("y", function(d, i) {
            return LABEL_RADIUS * Math.sin(i * PI/6) + C + YOFFSET;
        })
        .append("tspan")
        .attr("text-anchor", "middle")
        .text(function(d) {
                return d;
        })
        .style("font-size", String(W/15)+"px")
    }

    // hours ticks
    const hourTicks = (clock) => {
        var hourtick = clock.selectAll("hourtick")
        .data(d3.range(0, 12))
        .enter()
        .append("line")
        .attr("class", "hourtick")
        .attr('x1', function(d, i) {
            return TICK_RADIUS * Math.cos(i * PI/6) + C;
        })
        .attr("y1", function(d, i) {
            return TICK_RADIUS * Math.sin(i * PI/6) + C;
        })
        .attr('x2', function(d, i) {
            return RADIUS * Math.cos(i * PI/6) + C;
        })
        .attr('y2', function(d, i) {
            return RADIUS * Math.sin(i * PI/6) + C;
        })
        .attr("stroke-width", W/60)

    }

    //minutes ticks
    const minutesTicks = (clock) => {
        var minutes = clock.selectAll("minutes")
        .data(d3.range(0, 60))
        .enter()
        .append("line")
        .attr("class", "minutes")
        .attr('x1', function(d, i) {
            return TICK_RADIUS * Math.cos(i * PI/30)+C;
        })
        .attr("y1", function(d, i) {
            return TICK_RADIUS * Math.sin(i * PI/30)+C;
        })
        .attr('x2', function(d, i) {
            return RADIUS * Math.cos(i * PI/30)+C;
        })
        .attr('y2', function(d, i) {
            return RADIUS * Math.sin(i * PI/30)+C;
        })
        .attr("stroke-width", W/128)
    }

    //centre dot
    const centreDot = (clock) => {
        var centre = clock.append("circle")
        .attr("class", "centre")
        .attr("cx", C)
        .attr("cy", C)
        .attr("r", W/64)
    }

    //radians
    const radians = (tz) => {
        let hour_radian = (getHours(tz)-3) * PI/6 + getMinutes(tz) * PI/360 + getSeconds(tz) * PI/21600;
        let min_radian = (getMinutes(tz)-15) * PI/30;
        let sec_radian = (getSeconds(tz)-15) * PI/30;
        return {hour_radian, min_radian, sec_radian}
    }

    //hands
    const hands = (radians) => {
        let hands = [
            {
                "class": "hour",
                "radian": radians.hour_radian,
                "radius": HOUR_RADIUS,
                "width": W/60
            },
            {
                "class": "min",
                "radian": radians.min_radian,
                "radius": MIN_RADIUS,
                "width": W/100

            },
            {
                "class": "sec",
                "radian": radians.sec_radian,
                "radius": SEC_RADIUS,
                "width": W/200
            }                    
        ]

        d3.select(ref.current).append("g")
        .selectAll("line")
        .data(hands)
        .enter()
        .append("line")
        .attr("class", d => d.class+"Hand")
        .attr("x1", C)
        .attr("y1", C)
        .attr("x2", d => d.radius * Math.cos(d.radian)+C)
        .attr("y2", d => d.radius * Math.sin(d.radian)+C)
        .attr("stroke-width", d => d.width)
        .transition()
        .ease(d3.easeElastic.period(0.5))

    }

    //rotate hands
    const rotateHands = (radians) => {
        let hourMove = d3.select(ref.current).select(".hourHand")
        .transition().ease(d3.easeElastic.period(0.5))
        .attr("x2", HOUR_RADIUS * Math.cos(radians.hour_radian)+C)
        .attr("y2", HOUR_RADIUS * Math.sin(radians.hour_radian)+C)

        let minMove = d3.select(ref.current).select(".minHand")
        .transition().ease(d3.easeElastic.period(0.5))
        .attr("x2", MIN_RADIUS * Math.cos(radians.min_radian)+C)
        .attr("y2", MIN_RADIUS * Math.sin(radians.min_radian)+C)

        let secMove = d3.select(ref.current).select("g .secHand")
        .transition().ease(d3.easeElastic.period(0.5))
        .attr("x2", SEC_RADIUS * Math.cos(radians.sec_radian)+C)
        .attr("y2", SEC_RADIUS * Math.sin(radians.sec_radian)+C)
    }

    return  <div className="clock">
                <svg ref={ref}>
                </svg>
            </div>
}