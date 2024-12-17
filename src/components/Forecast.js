import React from "react";

const Forecast = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="forecast">
      <h3>Hourly Forecast</h3>
      <div className="forecast-cards">
        <div className="card">
          <p>12 AM</p>
          <p>{weatherData.main.temp}°C</p>
        </div>
        {/* Qo'shimcha vaqtlar qo'shish */}
      </div>
    </div>
  );
};

export default Forecast;
