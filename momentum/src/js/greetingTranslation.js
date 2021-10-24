// require("regenerator-runtime/runtime");
require("babel-polyfill");

import { getWeather } from "./getWeather";
import { getQuotes } from "./getQuotes";
import { getSettings } from "./settings";
import { getTranslateLinkPopup } from "./link";
import { hiddenWidget } from "./settings";
import { setBg } from "./setBg";
const widgetContainer = document.querySelector(".widget_container");
const photoList = document.querySelector(".photo_list");
const en = document.querySelector(".en");

function toggleBtnLang() {
  en.classList.toggle("ru");

  getSettings();
  toggleLang();

  getQuotes();
  translateLinkAndName();
  getTranslateLinkPopup();
  getWeather();
  // console.log(en.classList.value);
}
function translateLinkAndName() {
  const name = document.querySelector(".name");
  const link = document.querySelector(".link");
  let lang = toggleLang();
  if (lang === "en") {
    name.placeholder = "your name";
    link.textContent = "links";
  } else {
    name.placeholder = "ваше имя";
    link.textContent = "Ссылки";
  }
}
translateLinkAndName();

export function toggleLang() {
  let language = "en";
  if (en.classList.contains("ru")) {
    language = "ru";
  } else {
    language = "en";
  }

  return language;
}
en.addEventListener("click", toggleBtnLang);

window.addEventListener("load", () => {
  console.log("wwwww", en.classList.value);
});
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("lang")) {
    en.classList.value = localStorage.getItem("lang");
  }

  getSettings();
  toggleLang();

  getQuotes();
  translateLinkAndName();
  getTranslateLinkPopup();
  getWeather();
  hiddenWidget();
  // setBg();
});
