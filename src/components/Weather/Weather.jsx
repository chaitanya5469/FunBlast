import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';
import Header from "../Header";


function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/weather?city=${city}`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Could not fetch weather data');
    }
  };

  return (
    <div className="app">
      <Header/>
      <h2 style={{textAlign:"center"}}>Weather App</h2>
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="search-input"
        />
        <button onClick={getWeather} className="search-button">Get Weather</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-info">
        <h2 style={{color:"black"}}>{weather.current.name}</h2>
        <p>{weather.current.weather[0].description}</p>
        <p>{weather.current.main.temp}°C</p>
        <p>Humidity: {weather.current.main.humidity}%</p>
        <p>Wind Speed: {weather.current.wind.speed} m/s</p>
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div className="daily">
            {weather.forecast.list.slice(0, 5).map((day, index) => (
              <div key={index} className="day">
                <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: {day.main.temp}°C</p>
                <p>{day.weather[0].description}</p>
              </div>
            ))}
          </div>
          <h3>Weather Map</h3>
          <iframe
            title="Weather Map"
            src={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${weather.current.coord.lat}&lon=${weather.current.coord.lon}&zoom=10`}
            width="600"
            height="450"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      )}
     
    </div>
  );
}

export default Weather;
