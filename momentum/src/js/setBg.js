"use strict";
import { getTimeOfDay } from "./showTime.js";

const body = document.querySelector("body");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
let randomNum = getRandomNum(1, 20);

export function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// console.log(getRandomNum(1, 20));

//body background
function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = String(randomNum).padStart(2, "0");
  //   console.log(bgNum);
  const img = new Image();
  // img.src = `https://raw.githubusercontent.com/olgamartinchik/stage1-tasks/tree/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
  //   console.log("img", img.src);
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
