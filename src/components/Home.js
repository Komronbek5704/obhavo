import React, { useState } from "react";
import latinize from "latinize";


const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const translateCondition = (condition) => {
    const translations = {
      "Clear": "Ochiq",
      "Partially cloudy": "Qisman bulutli",
      "Overcast": "Qorong'i bulutli",
      "Rain": "Yomg'ir",
      "Light rain": "Yengil yomg'ir",
      "Heavy rain": "Kuchli yomg'ir",
      "Snow": "Qor",
      "Light snow": "Yengil qor",
      "Heavy snow": "Qattiq qor",
      "Fog": "Tuman",
      "Windy": "Shamolli",
      "Thunderstorm": "Momoqaldiroq",
      "Haze": "Tuzilgan tuman",
      "Drizzle": "Mayda yomg'ir",
    };
    return translations[condition] || condition;
  };

  const fetchWeather = async (selectedCity) => {
    const apiKey = "6XEZHUVFWSCHRDSYJGZ2TXYX4";
    const formattedCity = latinize(selectedCity).toLowerCase();
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formattedCity}?unitGroup=metric&key=${apiKey}&contentType=json&days=7`;

    try {
      setLoading(true);
      setError(null);
      setWeatherData([]);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("API'dan ma'lumot olib bo'lmadi. Shahar nomini tekshiring!");
      }

      const data = await response.json();
      if (data.days) {
        setWeatherData(data.days); // 7 kunlik ma'lumotlar
      } else {
        throw new Error("Ma'lumotlar topilmadi!");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather(city);
    } else {
      setError("Shahar nomini kiriting!");
    }
  };

  return (
    <div className="container">
      <h1 className="title">7 Kunlik Ob-havo Ma'lumotlari (Soatlik)</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Shahar nomini kiriting"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-field"
        />
        <button onClick={handleSearch} className="search-button">
          Qidirish
        </button>
      </div>

      {loading && <p className="loading">⏳ Ma'lumotlar yuklanmoqda...</p>}
      {error && <p className="error">{`❌ ${error}`}</p>}

      {weatherData.length > 0 && (
        <div className="daily-weather">
          {weatherData.map((day, index) => (
            <div key={index} className="day-container">
              <h2 className="day-title">
                {new Date(day.datetime).toLocaleDateString("uz-UZ", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h2>

              <table className="weather-table">
                <thead>
                  <tr>
                    <th>Soat</th>
                    <th>Harorat (°C)</th>
                    <th>Shamol (km/h)</th>
                    <th>Namlik (%)</th>
                    <th>Holat</th>
                  </tr>
                </thead>
                <tbody>
                  {day.hours.map((hour, idx) => (
                    <tr key={idx}>
                      <td>{hour.datetime}</td>
                      <td>{hour.temp}</td>
                      <td>{hour.windspeed}</td>
                      <td>{hour.humidity}</td>
                      <td>{translateCondition(hour.conditions)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
