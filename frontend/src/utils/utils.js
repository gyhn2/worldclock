import { DateTime } from 'luxon';


/* format time */
export function getDate(tz) {
    return DateTime.now().setZone(tz).toFormat('yyyy-MM-dd');
}

export function getDayAndTime(tz) {
    return DateTime.now().setZone(tz).toFormat('ccc, tt');
}

export function getHours(tz) {
    return DateTime.now().setZone(tz).toFormat('h');
}

export function getMinutes(tz) {
    return DateTime.now().setZone(tz).toFormat('m');
}

export function getSeconds(tz) {
    return DateTime.now().setZone(tz).toFormat('s');
}

//flag emoji
export function getFlags(country_code) {
    let emoji = String.fromCodePoint(...country_code.split('').map(char => 
        127397+char.charCodeAt(0)));
    return emoji
}
