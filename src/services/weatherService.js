import { DateTime } from "luxon"

const API_KEY  = 'c324bb022e61861c06e6421b56a3e704'
const baseUrl = 'https://api.openweathermap.org/data/2.5'


 
const getWeatherData = (infoType, searchParams) => {
    const url = new URL(baseUrl + '/' + infoType)
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})

    return fetch(url).then((res) => res.json())
}


const formatCurrentData = (data) =>{
    const {
        coord:{lat, lon},
        main:{temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys:{country, sunrise, sunset},
        weather,
        wind:{speed}
    } = data;

    const {main: details, icon} = weather[0]

    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset,details,icon, speed}
}




const formatForecastWeather = (data) =>{

    let {timezone, list} = data;
    list = list.map(d => {
        return{
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.main.temp,
            icon: d.weather[0].icon,
            pressure: d.main.pressure,
            
        }
    });

    return {timezone, list}

}



// function to return specific loication weather data && daily forecasted weather data
const getFormattedWeatherData = async (searchParams) =>{

    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
    .then(formatCurrentData)

    const {lat, lon} = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('forecast', 
                                            {
                                                lat, 
                                                lon, 
                                                units: searchParams.units, 
                                                 
                                            }).then(formatForecastWeather)

    return {...formattedCurrentWeather, ...formattedForecastWeather}

}

// function to change the 'dt' value into formatted time zone
const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime
                                                                                                .fromSeconds(secs) 
                                                                                                .setZone(zone)
                                                                                                .toFormat(format)

                                                                                            
// return unique weather icon based on icon value
const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`                                                                                              

export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode}