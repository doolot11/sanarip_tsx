import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import weatherIcon from "../../src/assets/images/weather-icon.svg";
import bg from "../../src/assets/images/backgroundwether.jpg";
import SearchIcon from "../assets/icons/searchicon.svg";
import humidity from "../assets/icons/humidity.svg";
import wind from "../assets/icons/wind.svg";
import { ReactComponent as Back } from "../assets/icons/goback.svg";
import { useNavigate } from "react-router-dom";

const api = {
  key: "d1ff2638e7be85cbc5538649119a9749",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  const navigate = useNavigate();
  const [currentCity, setCurrentCity] = useState("");
  const [search, setSearch] = useState("");
  const [dataWeather, setDataWeather] = useState({});
  const [errorLocation, setErrorLocation] = useState("");

  useEffect(() => {
    if (navigator?.geolocation) {
      const watcher = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            )
              .then((res) => res.json())
              .then((resp) => {
                const city = resp.address.city.slice(6);
                setCurrentCity(city);
              });
          } catch (error) {
            setErrorLocation("Error fetching city:", error);
          }
        },
        (error) => {
          setErrorLocation("Error getting geolocation", error);
        }
      );

      return () => navigator.geolocation.clearWatch(watcher);
    } else {
      setErrorLocation("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (currentCity) {
      fetch(`${api.base}weather?q=${currentCity}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setDataWeather(result);
        });
    }
  }, [currentCity]);

  const getResult = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setDataWeather(result);
      });
  };
  return (
    <Div>
      <Wrappper>
        <span onClick={() => navigate(-1)} className="goback">
          <Back />
          {"back"}
        </span>
        <div className="header">
          <input
            value={search}
            type="text"
            placeholder="Выберите город..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={getResult}>
            <img src={SearchIcon} alt="" />
          </button>
          <p className="invalid_city">
            {dataWeather?.message || errorLocation}
          </p>
        </div>
        <div className="body">
          <img src={weatherIcon} alt="" />
          <span>{dataWeather?.main?.temp} °C</span>
          <p>{dataWeather?.name}</p>
        </div>
        <div className="footer">
          <div className="humidity">
            <img src={humidity} alt="" />
            <div>
              <span>{dataWeather?.main?.humidity} %</span>
              <span>Humidity</span>
            </div>
          </div>
          <div className="wind">
            <img src={wind} alt="" />
            <div>
              <span>{dataWeather?.wind?.speed} km/h</span>
              <span>Wind</span>
            </div>
          </div>
        </div>
      </Wrappper>
    </Div>
  );
}

export default Weather;

const Div = styled.div`
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  position: fixed;
  height: 100%;
`;

const Wrappper = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.4);
  margin: 40px auto 0 auto;
  width: 30%;
  padding: 25px 20px;
  border-radius: 20px;
  & .goback {
    display: flex;
    opacity: 0.4;
    cursor: pointer;
    position: absolute;
    left: -70px;
    color: #fff;
  }
  & .invalid_city {
    position: absolute;
    top: 40px;
    left: 10px;
    color: #ff3939;
  }
  > div {
    margin: 45px auto;
  }
  & .header {
    display: flex;
    justify-content: space-around;
    gap: 18px;
    position: relative;
  }
  & .header > button {
    cursor: pointer;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
  }
  & .header > input {
    padding: 0 0 0 15px;
    height: 40px;
    width: 90%;
    border-radius: 20px;
    border: 1px solid gray;
  }
  & .header > input:focus {
    outline: none !important;
    border: 1px solid #fb6c56;
  }
  & .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    > img {
      width: 40%;
    }
  }
  & .body > span {
    font-size: 55px;
    color: #fff;
    font-weight: 600;
  }
  & .body > p {
    font-size: 30px;
    color: #fff;
  }
  & .footer {
    display: flex;
    justify-content: space-around;
  }
  & .footer > div {
    display: flex;
    & > img {
      width: 50px;
      margin-right: 10px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      & > span {
        font-weight: 500;
        color: #fff;
        font-size: 22px;
      }
    }
  }
`;
