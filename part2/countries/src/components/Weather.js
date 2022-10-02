import { useEffect, useState } from "react";
import axios from 'axios'
const Weather = ({ capital }) => {
  const [weather, setWeather] = useState('')
  const REACT_APP_OPENWEATHER_API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${REACT_APP_OPENWEATHER_API_KEY}`).then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }, [])

  return <>
    {weather ? <div><h2>Weather in {capital}</h2><p>temperature {weather.main.temp} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
      <p>wind {weather.wind.speed} m/s</p></div> : ""}</>
}

export default Weather