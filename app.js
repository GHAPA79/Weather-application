import getWeatherData from "./utils/httpReq.js";
import { showModal } from "./utils/modal.js";
import { getWeekDay } from "./utils/customDate.js";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const locationIcon = document.getElementById("location");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");

const renderCurrenWeather = (data) => {
    if (!data) return;
    const weatherJSX = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div id="main">
          <img alt="weather icon" src="https://openweathermap.org/img/w/${
              data.weather[0].icon
          }.png" >
          <span>${data.weather[0].main}</span>
          <p>Temp: ${Math.round(data.main.temp)} °C</p>
        </div>
        <div id="info">
          <p>Humidity: <span>${data.main.humidity}%</span></p>
          <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
        </div>
      `;
    weatherContainer.innerHTML = weatherJSX;
};

const renderForecastWeather = (data) => {
    if (!data) return;
    forecastContainer.innerHTML = "";
    data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
    data.forEach((item) => {
        const forecastJSX = `
            <div>
                <img alt="weather icon" src="https://openweathermap.org/img/w/${
                    item.weather[0].icon
                }.png" >
                <h3>${getWeekDay(item.dt)}</h3>
                <p>${Math.floor(item.main.temp)} °C</p>
                <span>${item.weather[0].main}</span>
            </div>
        `;
        forecastContainer.innerHTML += forecastJSX;
    });
};

const searchHandler = async () => {
    weatherContainer.innerHTML = "<span id='loader'></span>";
    const cityName = searchInput.value;

    if (!cityName) {
        showModal("Please enter city name!");
        return;
    }
    const currentData = await getWeatherData("current", cityName);
    renderCurrenWeather(currentData);
    const forecastData = await getWeatherData("forecast", cityName);
    renderForecastWeather(forecastData);
};

const positionCallback = async (position) => {
    const currentData = await getWeatherData("current", position.coords);
    renderCurrenWeather(currentData);
    const forecastData = await getWeatherData("forecast", position.coords);
    renderForecastWeather(forecastData);
};

const errorCallback = (error) => {
    showModal(error.message);
};

const locationHandler = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            positionCallback,
            errorCallback
        );
    } else {
        showModal("Your browser does not support geolocation");
    }
};

const initHandler = async () => {
    const currentData = await getWeatherData("current", "Tehran");
    renderCurrenWeather(currentData);
    const forecastData = await getWeatherData("forecast", "Tehran");
    renderForecastWeather(forecastData);
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
document.addEventListener("DOMContentLoaded", initHandler);
