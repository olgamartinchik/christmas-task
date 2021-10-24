import { setBg } from "./setBg";
const settings = document.querySelector(".settings");
const menuContainer = document.querySelector(".menu_container");
const menuWrapper = document.querySelector(".menu_wrapper");
const selectPhoto = document.querySelector(".select_photo");
const photoList = document.querySelector(".photo_list");
const photoItems = document.querySelectorAll(".photo_item");
const en = document.querySelector(".en");
const widgetContainer = document.querySelector(".widget_container");
const title1 = document.querySelector(".title1");
const title2 = document.querySelector(".title2");
const tagUnsplash = document.querySelector(".tag_unsplash");
const tagFlickr = document.querySelector(".tag_flickr");
const githubCollection = document.querySelector(".github_collection");
const unsplashCollection = document.querySelector(".unsplash_collection");
const flickrCollection = document.querySelector(".flickr_collection");

settings.addEventListener("click", () => {
  menuWrapper.classList.add("active");
});

window.addEventListener("click", (e) => {
  if (e.target === menuWrapper) {
    menuWrapper.classList.remove("active");
  }
});
photoItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    photoItems.forEach((el) => el.classList.remove("photo_active"));
    e.target.classList.add("photo_active");
    setBg();
    setLocalStorageSettings();
  });
});

const state = [
  {
    language: "en",
    photoSource1: "github collection",
    photoSource2: "unsplash collection",
    photoSource3: "flickr collection",
    placeholder1: "enter tag: nature, animals ...",
    placeholder2: "enter tag: space, London ...",
    title1: "Select photo source",
    title2: "Hide or show widgets",
    blocks: ["time", "date", "greeting", "quote", "weather", "audio", "link"],
  },
  {
    language: "ru",
    photoSource1: "github коллекция",
    photoSource2: "unsplash коллекция",
    photoSource3: "flickr коллекция",
    placeholder1: "введите тэг: природа, животные...",
    placeholder2: "введите тэг: космос, Лондон ...",
    title1: "Выбрать источник фото",
    title2: "Спрятать/показать виджеты",
    blocks: [
      "время",
      "дата",
      "приветствие",
      "цитата",
      "погода",
      "аудио",
      "ссылки",
    ],
  },
];
export function getSettings() {
  let ind = 0;
  if (en.classList.contains("ru")) {
    ind = 1;
  }
  widgetContainer.innerHTML = "";
  state[ind].blocks.forEach((block, index) => {
    const div = document.createElement("div");
    const input = document.createElement("input");
    input.id = index;
    input.classList.add("widget");
    input.value = block;
    input.checked = "true";
    input.type = "checkbox";
    const label = document.createElement("label");
    label.htmlFor = index;
    label.textContent = block;
    div.append(input);
    div.append(label);
    widgetContainer.append(div);
  });
  githubCollection.textContent = state[ind].photoSource1;
  unsplashCollection.textContent = state[ind].photoSource2;
  flickrCollection.textContent = state[ind].photoSource3;
  title1.textContent = state[ind].title1;
  title2.textContent = state[ind].title2;
  tagUnsplash.placeholder = `${state[ind].placeholder1}`;
  tagFlickr.placeholder = `${state[ind].placeholder2}`;
  setLocalStorageSettings();
}
getSettings();

export function hiddenWidget() {
  const widgets = document.querySelectorAll(".widget");

  const time = document.querySelector(".time");
  const date = document.querySelector(".date");
  const greeting = document.querySelector(".greeting-container");
  const quote = document.querySelector(".quote_widget");
  const weather = document.querySelector(".weather");
  const audio = document.querySelector(".player");
  const link = document.querySelector(".link");
  const arrayWidgets = [time, date, greeting, quote, weather, audio, link];

  widgets.forEach((widget, ind) => {
    widget.addEventListener("change", () => {
      if (widget.checked === false) {
        arrayWidgets[ind].classList.add("hidden");
      } else {
        arrayWidgets[ind].classList.remove("hidden");
      }
      setLocalStorageSettings();
    });
  });
}
hiddenWidget();

//localStorage
export function setLocalStorageSettings() {
  const widgetContainer = document.querySelector(".widget_container");
  const photoList = document.querySelector(".photo_list");

  // console.log(photoItems[0], photoItems[1], photoItems[2], photoList.innerHTML);
  localStorage.setItem("widgetContainer", widgetContainer.innerHTML);
  localStorage.setItem("photoList", photoList.innerHTML);
}
window.addEventListener("beforeunload", setLocalStorageSettings);
function getLocalStorageSettings() {
  // const widgetContainer = document.querySelector(".widget_container");
  // const photoList = document.querySelector(".photo_list");
  // if (localStorage.getItem("widgetContainer")) {
  //   widgetContainer.innerHTML = localStorage.getItem("widgetContainer");
  // }
  // if (localStorage.getItem("photoList")) {
  //   photoList.innerHTML = localStorage.getItem("photoList");
  // }
}
window.addEventListener("load", getLocalStorageSettings);
