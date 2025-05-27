import React, { useEffect, useState } from "react";
import WeatherChart from "./WeatherChart";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const API_KEY = process.env.REACT_APP_API_KEY; // This is where the key is accessed
      // Basic validation for API_KEY
      if (!API_KEY) {
        setError("API Key not found. Please create a .env file with REACT_APP_API_KEY.");
        return;
      }

      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(URL);
      setWeatherData(response.data);
      setError(null); // Clear any previous errors

      // Simulate historical temperatures (random variation)
      const temp = response.data.main.temp;
      const mockHistorical = Array.from({ length: 7 }, (_, i) => ({
        day: `Day ${i + 1}`,
        temp: (temp - Math.random() * 5).toFixed(1),
      }));
      setHistoricalData(mockHistorical);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Error fetching weather.");
      } else if (err.request) {
        setError("Network Error: Could not connect to the weather API.");
      } else {
        setError("An unexpected error occurred.");
      }
      setWeatherData(null); // Clear weather data on error
      setHistoricalData([]); // Clear historical data on error
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []); // Run once on component mount for initial load

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <div className="input-section">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error-message">{error}</p>} {/* Use a specific class for errors */}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          {historicalData.length > 0 && <WeatherChart data={historicalData} />}
        </div>
      )}
    </div>
  );
};

export default App;