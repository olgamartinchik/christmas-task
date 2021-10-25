"use strict";
// require("regenerator-runtime/runtime");
require("babel-polyfill");
import { toggleLang } from "./greetingTranslation.js";

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const weatherError = document.querySelector(".weather-error");
const en = document.querySelector(".en");
const iconWeather = document.querySelector(".icon_weather");

export async function getWeather() {
  try {
    // let lang = toggleLang();
    let cityValue;
    let lang = "en";
    if (en.classList.contains("ru")) {
      lang = "ru";
    } else {
      lang = "en";
    }

    if (city.value === "") {
      if (lang === "ru") {
        cityValue = "Минск";
        city.placeholder = "Минск";
      } else {
        cityValue = "Minsk";
        city.placeholder = "Minsk";
      }
    } else {
      cityValue = city.value;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=${lang}&appid=83b49ce53f5da56aad9c5b3153a63d22&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${
      lang === "en" ? "Wind speed" : "Скорость ветра"
    }: ${Math.round(data.wind.speed)} ${lang === "en" ? "m/s" : "м/с"}`;
    humidity.textContent = `${
      lang === "en" ? "Humidity" : "Влажность"
    }: ${Math.round(data.main.humidity)}%`;
    console.log("lang", lang);
  } catch (e) {
    console.error(e);
    weatherError.textContent = "There is no such city";
    // city.value = "";
  }
}
getWeather();
city.addEventListener("change", getWeather);

if (iconWeather) {
  iconWeather.addEventListener("click", () => {
    const weatherContainer = document.querySelector(".weather_container");
    console.log("click");
    weatherContainer.classList.add("active");
  });
}
city.addEventListener("focus", () => {
  weatherError.textContent = "";
});

window.addEventListener("click", (e) => {
  const weatherContainer = document.querySelector(".weather_container");
  if (e.target === weatherContainer) {
    weatherContainer.classList.remove("active");
  }
});
