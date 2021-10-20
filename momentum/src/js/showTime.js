"use strict";
require("babel-polyfill");
import { toggleLang } from "./greetingTranslation.js";
import { getTimeOfDayBg } from "./setBg";

const time = document.querySelector(".time");
const date = document.querySelector("date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const city = document.querySelector(".city");
// let lang = toggleLang();
function showTime() {
  let lang = toggleLang();
  const date = new Date();
  const currentTime = date.toLocaleTimeString(
    lang === "en" ? "en-US" : "ru-RU"
  );
  time.textContent = currentTime;

  showDate();
  showGreeting();
  getTimeOfDayBg();
  setTimeout(showTime, 1000);
}
showTime();

export function getWeekDay(date) {
  let lang = toggleLang();
  let days = [];
  lang === "ru"
    ? (days = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ])
    : (days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]);
  return days[date.getDay()];
}
function showDate() {
  const dateNow = new Date();
  let lang = toggleLang();
  const options = { month: "long", day: "numeric" };
  const currentDate = dateNow.toLocaleDateString(
    `${lang === "en" ? "en-Br" : "ru-RU"}`,
    options
  );

  const dayWeek = getWeekDay(dateNow);
  date.textContent = `${dayWeek}, ${currentDate}`;
}
function getTimeOfDay() {
  const date = new Date();
  let lang = toggleLang();
  const hours = date.getHours();
  let timeOfDay = "";
  if (hours < 12) {
    timeOfDay = lang === "en" ? "Good morning," : "Доброе утро,";
  } else if (hours < 18) {
    timeOfDay = lang === "en" ? "Good afternoon," : "Добрый день,";
  } else if (hours < 24) {
    timeOfDay = lang === "en" ? "Good evening," : "Добрый вечер,";
  } else if (hours < 6) {
    timeOfDay = lang === "en" ? "Good night," : "Доброй ночи,";
  }
  return timeOfDay;
}
function showGreeting() {
  let timeOfDay = getTimeOfDay();
  greeting.textContent = `${timeOfDay}`;
}

//input Name
function setLocalStorage() {
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}
window.addEventListener("load", getLocalStorage);
