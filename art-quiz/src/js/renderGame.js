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

//get data
async function getDataForGame() {
  const url = "/src/js/data.json";
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function mixArrayAnswer(ind, odj) {
  let data = await getDataForGame();
  odj.answerArtist.push(data[ind].author);
  odj.answerPicture.push(ind);
  for (let i = 0; i <= 2; i++) {
    let indAnswer = getRandomNum(ind + 1, 240);
    odj.answerArtist.push(data[indAnswer].author);
    odj.answerPicture.push(indAnswer);
  }

  shuffle(odjAnswer.answerArtist);
  shuffle(odjAnswer.answerPicture);
  return odj;
}

let allAnswer = {
  artist: [
    {
      0: [
        {
          indicator: true,
          imgNum: 10,
          author: "",
          name: "",
          year: "",
        },
        0,
      ],
    },
  ],
  picture: [{}],
};
const odjAnswer = {};
odjAnswer.answerArtist = [];
odjAnswer.answerPicture = [];
let nameCategory = "";

//handler  categoriesGame
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

async function renderGame() {
  let data = await getDataForGame();
  let index = 0;
  let countDots = 0;
  let countRightAnswer = Number(-1);

  // handler cardsCategory
  cardsCategory.forEach((card) => {
    card.addEventListener("click", getGame);
  });
  async function getGame(e) {
    countDots = 0;
    countRightAnswer = 0;
    odjAnswer.answerArtist = [];
    odjAnswer.answerPicture = [];
    let cardTheme = e.target.parentNode;
    // console.log("cardTheme", cardTheme);
    if (cardTheme.classList.contains("card_theme")) {
      cardTheme.classList.add("active_category");
      console.log(cardTheme.id);
      index = cardTheme.id * 10;
      console.log(index);
    }
    let mixObjAnswer = await mixArrayAnswer(index, odjAnswer);
    console.log("odjAnswer.answerPicture!!!", odjAnswer.answerPicture);
    console.log("odjAnswer.answerArtist!!!", odjAnswer.answerArtist);
    categoryPage.classList.add("hidden_section");

    if (nameCategory === "artist") {
      artistsQuizPage.classList.remove("hidden_section");
      answerContainerArtist.innerHTML = "";

      new CardGame(
        answerContainerArtist,
        mixObjAnswer,
        index
      ).generateArtistCategory();
    } else if (nameCategory === "picture") {
      pictureQuiz.classList.remove("hidden_section");
      answerContainerPicture.innerHTML = "";

      new CardGame(
        answerContainerPicture,
        mixObjAnswer,
        index
      ).generatePictureCategory();
      let painter = document.querySelector(".painter");
      painter.textContent = `${data[index].author}`;
    }
    const answers = document.querySelectorAll(".answer");
    answers.forEach((answer) => {
      answer.addEventListener("click", getAnswer);
    });
    getAnswer(e);
  }
  // handler answer
  const answers = document.querySelectorAll(".answer");
  answers.forEach((answer) => {
    answer.addEventListener("click", getAnswer);
  });
  async function getAnswer(e) {
    let data = await getDataForGame();
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
      if (indicator === true) {
        countRightAnswer++;
      }
      console.log("countRightAnswer", countRightAnswer);
      // open next popup
      const nextPopup = document.querySelector(".next_popup");
      nextPopup.classList.add("visiblePopup");

      const selectionAnswer = document.querySelector(".selection_answer");
      const pictureAbout = document.querySelector(".picture_about");
      const authorPicture = document.querySelector(".author_picture");
      const pictureYear = document.querySelector(".picture_year");
      let nextImg = document.querySelector(".next_img");

      if (indicator === false) {
        console.log("false", selectionAnswer);
        selectionAnswer.classList.add("false");
      } else {
        console.log("true", selectionAnswer);
        selectionAnswer.classList.remove("false");
      }
      nextImg.src = `/src/assets/full/${data[index].imageNum}full.jpg`;
      pictureAbout.textContent = data[index].name;
      authorPicture.textContent = data[index].author;
      pictureYear.textContent = data[index].year;
      console.log("111", rightAnswer, userAnswer, indicator);

      // mix card, ind++
      index++;

      console.log("index", index);
      console.log("odjAnswer.answerPicture", odjAnswer.answerPicture);
    }
  }

  /// //handler next btn
  const nextBtn = document.querySelector(".next_btn");
  nextBtn.addEventListener("click", getNewQuestion);
  async function getNewQuestion(e) {
    const nextPopup = document.querySelector(".next_popup");
    nextPopup.classList.remove("visiblePopup");
    document.body.classList.remove("hidden");
    odjAnswer.answerArtist = [];
    odjAnswer.answerPicture = [];
    let mixObjAnswer = await mixArrayAnswer(index, odjAnswer);
    console.log(
      "1mixObjAnswer",
      mixObjAnswer.answerArtist,
      mixObjAnswer.answerPicture
    );
    if (nameCategory === "picture") {
      answerContainerPicture.innerHTML = "";
      let painter = document.querySelector(".painter");
      painter.textContent = `${data[index].author}`;
      new CardGame(
        answerContainerPicture,
        mixObjAnswer,
        index
      ).generatePictureCategory();
    } else if (nameCategory === "artist") {
      answerContainerArtist.innerHTML = "";
      new CardGame(
        answerContainerArtist,
        mixObjAnswer,
        index
      ).generateArtistCategory();
    }

    countDots++;
    console.log("countDots", countDots);
    const dots = document.querySelectorAll(".dot");
    console.log("dots", dots);
    if (countDots <= 10) {
      for (let i = 0; i <= countDots; i++) {
        dots[i].classList.add("active_btn");
      }
    }

    const answers = document.querySelectorAll(".answer");
    answers.forEach((answer) => {
      answer.addEventListener("click", getAnswer);
    });
    getAnswer(e);

    //open congratulations_popup
    const congratulationsPopup = document.querySelector(
      ".congratulations_popup"
    );
    const grandPopup = document.querySelector(".grand_popup");
    const titlePopup = document.querySelector(".title_popup");
    const rightAnswer = document.querySelector(".right_answer");

    rightAnswer.textContent = countRightAnswer;

    if (countDots === 9) {
      // && countRightAnswer <= 9
      congratulationsPopup.classList.add("visiblePopup");
      if (countRightAnswer <= 4) {
        titlePopup.textContent = "Try again";
      } else {
        titlePopup.textContent = "Congratulation!";
      }
    } else if (countRightAnswer === 10) {
      grandPopup.classList.add("visiblePopup");
    }
  }
}
renderGame();
