// require("regenerator-runtime/runtime");
require("babel-polyfill");

import { getWeather } from "./getWeather";
import { getQuotes } from "./getQuotes";
import { getSettings } from "./settings";

const en = document.querySelector(".en");
const name = document.querySelector(".name");

function toggleBtnLang() {
  en.classList.toggle("ru");
  if (en.classList.contains("ru")) {
    name.placeholder = "ваше имя";
  } else {
    name.placeholder = "your name";
  }
  getSettings();
  toggleLang();
  getWeather();
  getQuotes();
}

export function toggleLang() {
  let language = "en";
  if (en.classList.contains("ru")) {
    language = "ru";
  } else {
    language = "en";
  }
  // console.log("language", en.classList.contains("ru"));
  return language;
}
en.addEventListener("click", toggleBtnLang);
