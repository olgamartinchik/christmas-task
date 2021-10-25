"use strict";

import { async } from "regenerator-runtime";

// import { getTimeOfDay } from "./showTime.js";
import { setLocalStorageSettings } from "./link";

const body = document.querySelector("body");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
const githubCollection = document.querySelector(".github_collection");
const unsplashCollection = document.querySelector(".unsplash_collection");
const flickrCollection = document.querySelector(".flickr_collection");
const tagUnsplash = document.querySelector(".tag_unsplash");
const tagFlickr = document.querySelector(".tag_flickr");
const tagUnsplashError = document.querySelector(".tag_unsplash_error");
const tagFlickrError = document.querySelector(".tag_flickr_error");

let randomNum = getRandomNum(1, 20);
let timeOfDay;

export function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//body background
tagUnsplash.addEventListener("focus", () => {
  tagUnsplashError.textContent = "";
});
tagFlickr.addEventListener("focus", () => {
  tagFlickrError.textContent = "";
});
tagUnsplash.addEventListener("blur", () => {
  tagUnsplashError.textContent = "";
});
tagFlickr.addEventListener("blur", () => {
  tagFlickrError.textContent = "";
});
tagUnsplash.addEventListener("change", getTagUnsplash);
function getTagUnsplash() {
  tagUnsplashError.textContent = "";
  console.log(tagUnsplash.value);
  if (tagUnsplash.value !== "") {
    timeOfDay = tagUnsplash.value;
  } else {
    timeOfDay = getTimeOfDayBg();
  }
  localStorage.setItem("tagUnsplash", tagUnsplash.value);
  setBg();
}

tagFlickr.addEventListener("change", (e) => {
  tagFlickrError.textContent = "";
  if (tagFlickr.value !== "") {
    timeOfDay = tagFlickr.value;
  } else {
    timeOfDay = getTimeOfDayBg();
  }
  localStorage.setItem("tagFlickr", tagFlickr.value);
  setBg();
});

//Flickr API
async function getPhotoFlickr(img) {
  try {
    if (tagFlickr.value !== "") {
      timeOfDay = tagFlickr.value;
    } else {
      timeOfDay = getTimeOfDayBg();
    }
    let randomNum = getRandomNum(1, 100);
    const photo = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b094181a7ec3bb69f45a00119a1e2fd8&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
    const rez = await fetch(photo);
    const data = await rez.json();
    img.src = `${data.photos.photo[randomNum].url_l}`;
    console.log("timeOfDay", timeOfDay);
  } catch (e) {
    tagFlickrError.textContent = "try another tag";
  }
}
//unsplash
async function getPhotoUnsplash(img) {
  try {
    if (tagUnsplash.value !== "") {
      timeOfDay = tagUnsplash.value;
    } else {
      timeOfDay = getTimeOfDayBg();
    }
    const photo = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=ekFxRTksnevndmHbJWhEJ7rKtpU2gaF6gQOUUpzLG8k`;
    const res = await fetch(photo);
    const data = await res.json();
    img.src = data.urls.regular;
    console.log("timeOfDay", timeOfDay);
  } catch (e) {
    tagUnsplashError.textContent = "try another tag";
  }
}
export function setBg() {
  const timeOfDay = getTimeOfDayBg();
  const bgNum = String(randomNum).padStart(2, "0");
  const img = new Image();
  if (flickrCollection.classList.contains("photo_active")) {
    getPhotoFlickr(img);
  }

  if (unsplashCollection.classList.contains("photo_active")) {
    getPhotoUnsplash(img);
  }

  //github
  if (githubCollection.classList.contains("photo_active")) {
    img.src = `https://raw.githubusercontent.com/olgamartinchik/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  }

  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}
setBg();

// get time of day for bg
export function getTimeOfDayBg() {
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

//slider body
function getSlideNext() {
  randomNum++;
  if (randomNum === 21) {
    randomNum = 1;
  }
  setBg();
}
function getSlidePrev() {
  randomNum--;
  if (randomNum === 0) {
    randomNum = 20;
  }
  setBg();
}
slidePrev.addEventListener("click", getSlidePrev);
slideNext.addEventListener("click", getSlideNext);

function getLocalStoragePhoto() {
  if (localStorage.getItem("tagUnsplash")) {
    tagUnsplash.value = localStorage.getItem("tagUnsplash");
    timeOfDay = tagUnsplash.value;
  }
  if (localStorage.getItem("tagFlickr")) {
    tagFlickr.value = localStorage.getItem("tagFlickr");
    timeOfDay = tagFlickr.value;
  }
  setBg();
}
window.addEventListener("DOMContentLoaded", getLocalStoragePhoto);
