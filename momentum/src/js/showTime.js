"use strict";
require("babel-polyfill");

const time = document.querySelector(".time");
const date = document.querySelector("date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const city = document.querySelector(".city");

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting();

  setTimeout(showTime, 1000);
}
showTime();

function getWeekDay(date) {
  let daysEn = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // let daysRu = [
  //   "Воскресенье",
  //   "Понедельник",
  //   "Вторник",
  //   "Среда",
  //   "Четверг",
  //   "Пятница",
  //   "Суббота",
  // ];
  return daysEn[date.getDay()];
}
function showDate() {
  const dateNow = new Date();
  const options = { month: "long", day: "numeric" };
  const currentDate = dateNow.toLocaleDateString("en-Br", options);

  const dayWeek = getWeekDay(dateNow);
  date.textContent = `${dayWeek}, ${currentDate}`;
}
export function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay = "";
  if (hours < 12) {
    timeOfDay = "morning";
  } else if (hours < 18) {
    timeOfDay = "afternoon";
  } else if (hours < 24) {
    timeOfDay = "evening";
  } else if (hours < 6) {
    timeOfDay = "night";
  }
  return timeOfDay;
}
function showGreeting() {
  let timeOfDay = getTimeOfDay();
  greeting.textContent = `Good ${timeOfDay}`;
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
