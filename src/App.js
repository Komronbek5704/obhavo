import React, { useState } from "react";
import Home from "./components/Home";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const fetchWeather = async (city) => {
    const apiKey = "YOUR_API_KEY"; // OpenWeatherMap API kalit
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("API xatosi:", error);
    }
  };

  return (
    <div className="app">
      <Home city={city} setCity={setCity} fetchWeather={fetchWeather} weatherData={weatherData} />
      <Forecast weatherData={weatherData} />
    </div>
  );
}

export default App;
