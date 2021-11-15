import { async } from "regenerator-runtime";
import { CategoryCard } from "./generateCategoryCard";
import { CardGame } from "./generateCardGame";

const mainPage = document.querySelector(".main_page");
const categoryPage = document.querySelector(".category_page");
const cardsCategory = document.querySelectorAll(".cards_category");
const artistCardsCategory = document.querySelector(".artist");
const pictureCardsCategory = document.querySelector(".picture");
const categoriesGame = document.querySelector(".categories_game");
const artistsQuizPage = document.querySelector(".artists_quiz");
const pictureQuiz = document.querySelector(".picture_quiz");
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

let rightAnswer = [];
const odjAnswer = {};
odjAnswer.answerArtist = [];
odjAnswer.answerPicture = [];
let nameCategory = "";

categoriesGame.addEventListener("click", getCategory);

function getCategory(e) {
  const cardCategory = e.target.parentNode;
  if (cardCategory.classList.contains("category_game")) {
    // console.log("yes");
    cardCategory.classList.add("active_game");
  }

  if (cardCategory.classList.contains("artists_game", "active_game")) {
    mainPage.classList.add("hidden_section");
    categoryPage.classList.remove("hidden_section");
    nameCategory = "artist";
    console.log("artists_game");
    artistCardsCategory.classList.remove("hidden_section");
    if (artistCardsCategory.innerHTML.length === 0) {
      new CategoryCard(artistCardsCategory, nameCategory).crateCardCategory();
    }
  } else if (cardCategory.classList.contains("pictures_game", "active_game")) {
    mainPage.classList.add("hidden_section");
    categoryPage.classList.remove("hidden_section");
    nameCategory = "picture";
    console.log("pictures_game");
    pictureCardsCategory.classList.remove("hidden_section");
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

  //get game
  let index = 0;
  cardsCategory.forEach((card) => {
    card.addEventListener("click", getGame);
  });

  // answer.addEventListener("click", getAnswer);
  // function getAnswer(e) {
  //   console.log("click");
  // }
  function getGame(e) {
    //get
    odjAnswer.answerArtist = [];
    odjAnswer.answerPicture = [];
    let cardTheme = e.target.parentNode;
    // console.log("cardTheme", cardTheme);
    if (cardTheme.classList.contains("card_theme")) {
      cardTheme.classList.add("active_category");
      console.log(cardTheme.id);
      index = cardTheme.id * 10;
      console.log(index);
      //
      odjAnswer.answerArtist.push(data[index].author);
      odjAnswer.answerPicture.push(index);
      for (let i = 0; i <= 2; i++) {
        let indAnswer = getRandomNum(index + 1, 240);
        odjAnswer.answerArtist.push(data[indAnswer].author);
        odjAnswer.answerPicture.push(indAnswer);
      }
    }

    shuffle(odjAnswer.answerArtist);
    shuffle(odjAnswer.answerPicture);
    console.log("odjAnswer.answerPicture", odjAnswer.answerPicture);
    console.log("odjAnswer.answerArtist", odjAnswer.answerArtist);
    categoryPage.classList.add("hidden_section");

    if (nameCategory === "artist") {
      artistsQuizPage.classList.remove("hidden_section");
      answerContainerArtist.innerHTML = "";
      new CardGame(
        answerContainerArtist,
        odjAnswer,
        index
      ).generateArtistCategory();
    } else if (nameCategory === "picture") {
      pictureQuiz.classList.remove("hidden_section");
      answerContainerPicture.innerHTML = "";
      new CardGame(
        answerContainerPicture,
        odjAnswer,
        index
      ).generatePictureCategory();
      const painter = document.querySelector(".painter");
      painter.textContent = `${data[index].author}`;
    }
    //answer
    const answers = document.querySelectorAll(".answer");
    answers.forEach((answer) => {
      answer.addEventListener("click", getAnswer);
      function getAnswer(e) {
        const ans = e.target;
        if (ans.classList.contains("ans")) {
          console.log("nameCategory", nameCategory);
          let rightAnswer = null;
          let userAnswer = null;
          let indicator = null;
          if (nameCategory === "picture") {
            rightAnswer = String(odjAnswer.answerPicture.indexOf(index));
            userAnswer = ans.id;
          }
          if (nameCategory === "artist") {
            rightAnswer = data[index].author;
            userAnswer = ans.textContent;
          }
          if (rightAnswer === userAnswer) {
            ans.classList.add("true");
            indicator = true;
          } else {
            ans.classList.add("false");
            indicator = false;
          }
          const nextPopup = document.querySelector(".next_popup");
          nextPopup.style.display = "flex";
          // document.body.classList.add("hidden");
          const nextBtn = document.querySelector(".next_btn");
          const selectionAnswer = document.querySelector(".selection_answer");
          const pictureAbout = document.querySelector(".picture_about");
          const authorPicture = document.querySelector(".author_picture");
          const pictureYear = document.querySelector(".picture_year");
          const nextImg = document.querySelector(".next_img");

          if (indicator === false) {
            console.log("false", selectionAnswer);
            selectionAnswer.classList.add("false");
          } else {
            console.log("true", selectionAnswer);
            selectionAnswer.classList.remove("false");
          }
          nextImg.src = `/src/assets/full/${index}full.jpg`;
          pictureAbout.textContent = data[index].name;
          authorPicture.textContent = data[index].author;
          pictureYear.textContent = data[index].year;
          console.log("111", rightAnswer, userAnswer, indicator);
          //next btn
          nextBtn.addEventListener("click", (e) => {
            nextPopup.style.display = "none";
            document.body.classList.remove("hidden");
          });
        }
      }
    });
  }
}
getDataForGame();
