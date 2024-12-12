import { showModal } from "./modal.js";

const API_KEY = "b52e9e42290a415c8b49238f5b0fca00";
const BASE_URL = `https://api.openweathermap.org/data/2.5/`;

const getWeatherData = async (type, data) => {
    let url = null;

    switch (type) {
        case "current":
            if (typeof data === "string") {
                url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
            } else {
                url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
            }
            break;
        case "forecast":
            if (typeof data === "string") {
                url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
            } else {
                url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
            }
            break;
        default:
            url = `${BASE_URL}/weather?q=tehran&appid=${API_KEY}&units=metric`;
            break;
    }
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        if (+jsonData.cod === 200) {
            return jsonData;
        } else {
            showModal(jsonData.message);
        }
    } catch (error) {
        showModal("An error occured while fetching data!");
    }
};

export default getWeatherData;

// const getCurrentWeatherByCityName = async (cityName) => {
//     const url = `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// };

// const getCurrentWeatherByCoordinates = async (lat, lon) => {
//     const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// };

// const getForecastWeatherByCityName = async (cityName) => {
//     const url = `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// };

// const getforecastWeatherByCoordinates = async (lat, lon) => {
//     const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// };
