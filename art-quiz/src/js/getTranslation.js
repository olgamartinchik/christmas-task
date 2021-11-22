import { nameCategory } from "./renderGame";
import { CategoryCard } from "./generateCategoryCard";
const en = document.querySelector("#en");
const ru = document.querySelector("#ru");
const checkedLang = document.querySelectorAll(".checked_lang");
const volumeTitle = document.querySelector(".volume_title");
const languageTitle = document.querySelector(".language_title");
const onOf = document.querySelector(".on_of");
const timerTitle = document.querySelector(".timer_title");
const timeGame = document.querySelector(".time_game_title");
const saveBtn = document.querySelector(".save_btn");
const defaultBtn = document.querySelector(".default_btn");
const mainBtnTitle = document.querySelector(".main_btn_title");
const settingsTitle = document.querySelector(".settings_title");
const titleQuiz = document.querySelectorAll(".title_quiz");
const artistTitle = document.querySelector(".artist_title");
const pictureTitle = document.querySelector(".picture_title");
const homeBtnTitle = document.querySelectorAll(".home_btn_title");
const noBtn = document.querySelector(".no_btn");
const yesBtn = document.querySelector(".yes_btn");
const scoreTitle = document.querySelector(".score_title");
const categoryBtnTitle = document.querySelector(".category_btn_title");
const gameOverSubtitle = document.querySelector(".game_over_subtitle");
const gameOverTitle = document.querySelector(".game_over_title");
const nextQuizBtn = document.querySelector(".next_quiz_btn");
const congratulationsTitle = document.querySelector(".congratulations_title");
const questionTitle1 = document.querySelector(".question_title1");
const questionTitle2 = document.querySelector(".question_title2");
const questionTitle = document.querySelector(".question_title");
const categoryTitle = document.querySelector(".category_title");
const scoreBtnTitle = document.querySelector(".score_btn_title");
const russianTitle = document.querySelector(".russian_title");
const englishTitle = document.querySelector(".english_title");

let enLang = true;
let ruLang = false;
// export let url = "/src/js/dataEn.json";
checkedLang.forEach((lang) => {
  lang.addEventListener("change", changeLang);
});
function changeLang(e) {
  if (e.target.id === "ru") {
    ruLang = true;
    enLang = false;
  }
  if (e.target.id === "en") {
    ruLang = false;
    enLang = true;
  }
  toggleLang(enLang, ruLang);
}
export function toggleLang(enLang, ruLang) {
  settingsTitle.textContent = enLang === true ? "settings" : "настройки";
  volumeTitle.textContent = enLang === true ? "volume" : "звук";
  languageTitle.textContent = enLang === true ? "language" : "язык";
  onOf.textContent = enLang === true ? "on/off" : "вкл/выкл";
  timerTitle.textContent =
    enLang === true ? "Time to answer" : "Время на ответ";
  timeGame.textContent = enLang === true ? "time game" : "Время игры";
  saveBtn.textContent = enLang === true ? "SAVE" : "сохранить";
  defaultBtn.textContent = enLang === true ? "DEFAULTS" : "сброс";
  mainBtnTitle.textContent = enLang === true ? "settings" : "настройки";
  titleQuiz.forEach((title) => {
    title.textContent = enLang === true ? "QUIZ" : "викторина";
  });
  artistTitle.textContent = enLang === true ? "ARTISTS" : "художники";
  pictureTitle.textContent = enLang === true ? "PICTURE" : "картины";
  homeBtnTitle.forEach((btn) => {
    btn.textContent = enLang === true ? "home" : "главная";
  });
  noBtn.textContent = enLang === true ? "no" : "нет";
  yesBtn.textContent = enLang === true ? "yes" : "да";
  scoreTitle.textContent = enLang === true ? "score" : "счет";
  categoryBtnTitle.textContent = enLang === true ? "category" : "категории";
  gameOverSubtitle.textContent =
    enLang === true ? "PLAY AGAIN ?" : "играть снова ?";
  gameOverTitle.textContent = enLang === true ? "GAME OVER" : "игра окончена";
  nextQuizBtn.textContent = enLang === true ? "NEXT QUIZ" : "далее";
  congratulationsTitle.textContent =
    enLang === true ? "CONGRATULATIONS!" : "великолепно";
  questionTitle1.textContent = enLang === true ? "Which is" : "Какую картину";
  questionTitle2.textContent = enLang === true ? "picture?" : "написал?";
  questionTitle.textContent =
    enLang === true
      ? "Who is the author of this picture?"
      : "Кто автор картины?";
  categoryTitle.textContent = enLang === true ? "categories" : "категории";
  scoreBtnTitle.textContent = enLang === true ? "score" : "счет";
  russianTitle.textContent = enLang === true ? "russian" : "русский ";
  englishTitle.textContent = enLang === true ? "english" : "английский ";

  if (nameCategory === "artist") {
    const cardsCategory = document.querySelector(".cards_category");
    cardsCategory.innerHTML = "";
    new CategoryCard(cardsCategory).crateCardCategory();
  } else if (nameCategory === "pictures") {
    const cardsCategory = document.querySelector(".cards_category");
    cardsCategory.innerHTML = "";
    new CategoryCard(cardsCategory).crateCardCategory();
  }
}

toggleLang(enLang, ruLang);

window.addEventListener("load", () => {
  if (localStorage.getItem("settingsData")) {
    const localSettings = JSON.parse(localStorage.getItem("settingsData"));
    let en = localSettings.enChecked;
    let ru = localSettings.ruChecked;
    enLang = en;
    ruLang = ru;
    toggleLang(enLang, ruLang);
  }
});
