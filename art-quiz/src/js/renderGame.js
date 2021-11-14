import { async } from "regenerator-runtime";
import { CategoryCard } from "./generateCategoryCard";
import { CardGame } from "./generateCardGame";
import { images } from "./images";
const mainPage = document.querySelector(".main_page");
const categoryPage = document.querySelector(".category_page");
const cardsCategory = document.querySelector(".cards_category");
const artistCardsCategory = document.querySelector(".artist");
const pictureCardsCategory = document.querySelector(".picture");
const categoriesGame = document.querySelector(".categories_game");
const artistsQuizPage = document.querySelector(".artists_quiz");
const answerContainerArtist = document.querySelector(
  ".answer_container_artist"
);
const answerContainerPicture = document.querySelector(
  ".answer_container_picture"
);

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let answerArtist = [];
let rightAnswer = [];
console.log("answerArtist", answerArtist);

categoriesGame.addEventListener("click", getCategory);
let nameCategory = "";

function getCategory(e) {
  const cardCategory = e.target.parentNode;
  if (cardCategory.classList.contains("category_game")) {
    console.log("yes");
    cardCategory.classList.add("active_game");
  }
  mainPage.classList.add("hidden_section");
  categoryPage.classList.remove("hidden_section");

  if (cardCategory.classList.contains("artists_game", "active_game")) {
    nameCategory = "artist";
    console.log("artists_game");
    artistCardsCategory.classList.remove("hidden_section");
    if (artistCardsCategory.innerHTML.length === 0) {
      new CategoryCard(artistCardsCategory, nameCategory).crateCardCategory();
    }
  } else if (cardCategory.classList.contains("pictures_game", "active_game")) {
    nameCategory = "picture";
    console.log("pictures_game");
    if (pictureCardsCategory.innerHTML.length === 0) {
      pictureCardsCategory.classList.remove("hidden_section");
      new CategoryCard(pictureCardsCategory, nameCategory).crateCardCategory();
    }
  }
}

async function getDataForGame() {
  //get data
  const url = "/src/js/data.json";
  const res = await fetch(url);
  const data = await res.json();
  console.log("data", data);
  //get game
  let index = 0;
  cardsCategory.addEventListener("click", getGame);
  function getGame(e) {
    answerArtist = [];
    let cardTheme = e.target.parentNode;
    if (cardTheme.classList.contains("card_theme")) {
      cardTheme.classList.add("active_category");
      console.log(cardTheme.id);
      index = cardTheme.id * 10;
      console.log(index);
      answerArtist.push(data[index].author);

      for (let i = 0; i <= 2; i++) {
        let indAnswer = getRandomNum(index, 240);
        answerArtist.push(data[indAnswer].author);
      }
    }
    shuffle(answerArtist);
    console.log("answerArtist", answerArtist);
    categoryPage.classList.add("hidden_section");

    if (nameCategory === "artist") {
      artistsQuizPage.classList.remove("hidden_section");
      answerContainerArtist.innerHTML = "";
      new CardGame(
        answerContainerArtist,
        answerArtist,
        index
      ).generateArtistCategory();
      const dots = document.querySelectorAll("dot");
      console.log(dots);
    } else if (nameCategory === "picture") {
      return;
    }
  }
}
getDataForGame();
