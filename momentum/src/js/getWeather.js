"use strict";
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const weatherError = document.querySelector(".weather-error");

async function getWeather() {
  try {
    if (city.value.length === 0) {
      city.value = "Minsk";
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=83b49ce53f5da56aad9c5b3153a63d22&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
  } catch (e) {
    weatherError.textContent = "There is no such city";
    city.value = "";
  }
}
getWeather();
city.addEventListener("change", getWeather);
// city.addEventListener("click", () => {
//   city.value = "";
// });
// city.addEventListener("blur", () => {
//   if (localStorage.getItem("city")) {
//     city.value = localStorage.getItem("city");
//   }
// });
