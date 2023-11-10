import React, { useState, useEffect } from "react";
import axios from "axios";
import { wmodata } from "../data/wmodata";

const CountryWeather = ({ capital, capitalcoords }) => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (capital) {
      let [lat, long] = capitalcoords.split(",");
      axios(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&forecast_days=1&daily=temperature_2m_max&daily=temperature_2m_min&daily=precipitation_probability_mean&daily=wind_speed_10m_max&daily=weather_code`
      ).then((res) => setdata(res.data.daily));
    }
  }, [capital]);

  return (
    <>
      {data ? (
        <div>
          <h3>
            Weather on <i>{capital}</i>
          </h3>
          <span style={spanstyle}>
            <img
              src={wmodata[data.weather_code].day.image}
              style={imgstyle}
            ></img>
            <p style={descriptionstyle}>
              {wmodata[data.weather_code].day.description}
            </p>
          </span>
          <p>Min: {data.temperature_2m_min}C°</p>
          <p>Max: {data.temperature_2m_max}C°</p>
          <p>Rain chance: {data.precipitation_probability_mean}%</p>
          <p>Max wind speed: {data.wind_speed_10m_max}km/h</p>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

const spanstyle = {
  display: "block",
  height: "130px",
  width: "100px",
  borderRadius: "10px",
  overflow: "hiden",
  backgroundColor: "#333",
  padding: "0 5px",
};
const imgstyle = { height: "80px", width: "100%" };
const descriptionstyle = {
  margin: 0,
  color: "#f5f5f5",
  textAlign: "center",
  lineHeight: 1,
  fontSize: "15px",
};

export default CountryWeather;
