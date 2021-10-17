// import { name } from "file-loader";
const body = document.querySelector("body");
const time = document.querySelector(".time");
const date = document.querySelector("date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
let randomNum = getRandomNum(1, 20);
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
  let daysRu = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  return daysEn[date.getDay()];
}
function showDate() {
  const dateNow = new Date();
  const options = { month: "long", day: "numeric" };
  const currentDate = dateNow.toLocaleDateString("en-Br", options);

  const dayWeek = getWeekDay(dateNow);
  date.textContent = `${dayWeek}, ${currentDate}`;
}
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay = "";
  if (hours < 12) {
    timeOfDay = "morning";
  } else if (hours < 18) {
    timeOfDay = "day";
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
}
window.addEventListener("beforeunload", setLocalStorage);
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

//body background
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomNum(1, 20));

function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = String(randomNum).padStart(2, "0");
  //   console.log(bgNum);
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
  console.log("img", img.src);
}
setBg();

//slider body
function getSlideNext() {
  randomNum++;
  if (randomNum === 20) {
    randomNum = 1;
  }
  setBg();
}
function getSlidePrev() {
  randomNum--;
  if (randomNum === 1) {
    randomNum = 20;
  }
  setBg();
}
slidePrev.addEventListener("click", getSlidePrev);
slideNext.addEventListener("click", getSlideNext);
