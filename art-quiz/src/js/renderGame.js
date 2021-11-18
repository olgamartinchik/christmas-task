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
const audioContainer = document.querySelector(".audio_container");

//get data
export async function getDataForGame() {
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
};
const odjAnswer = {};
odjAnswer.answerArtist = [];
odjAnswer.answerPicture = [];
let nameCategory = "";

const audioGameOver = new Audio();
audioGameOver.classList.add("audio");
audioGameOver.src = "/src/assets/audio/game_over.mp3";
let buttonPress = new Audio();
buttonPress.classList.add("audio", "buttonPress");
buttonPress.src = "/src/assets/audio/button2.mp3";
const won1 = new Audio();
won1.classList.add("audio");
won1.src = "/src/assets/audio/game-won.mp3";
const won2 = new Audio();
won2.classList.add("audio");
won2.src = "/src/assets/audio/zvuk-pobedyi-vyiigryisha.mp3";
const won3 = new Audio();
won3.classList.add("audio");
won3.src = "/src/assets/audio/finish_game.mp3";
audioContainer.appendChild(audioGameOver);
audioContainer.appendChild(buttonPress);
audioContainer.appendChild(won1);
audioContainer.appendChild(won2);
audioContainer.appendChild(won3);

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
  const timeGame = document.querySelector(".time_game");
  let data = await getDataForGame();
  let index = 0;
  let countDots = 0;
  let countRightAnswer = Number(-1);
  let cardThemeId;
  let tik = timeGame.textContent;

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
    console.log("cardTheme", cardTheme.id);
    if (cardTheme.classList.contains("card_theme")) {
      cardTheme.classList.add("active_category");
      console.log(cardTheme.id);
      cardThemeId = cardTheme.id;
      index = cardTheme.id * 10;
      console.log(index);
    }
    let mixObjAnswer = await mixArrayAnswer(index, odjAnswer);
    // console.log("odjAnswer.answerPicture!!!", odjAnswer.answerPicture);
    // console.log("odjAnswer.answerArtist!!!", odjAnswer.answerArtist);
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

    // console.log("!!!!!!!!!", timerContainer.classList.value);
  }

  // handler answer
  const answers = document.querySelectorAll(".answer");
  answers.forEach((answer) => {
    answer.addEventListener("click", getAnswer);
  });
  async function getAnswer(e) {
    buttonPress.play();
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
      // next popup data
      const selectionAnswer = document.querySelector(".selection_answer");
      const pictureAbout = document.querySelector(".picture_about");
      const authorPicture = document.querySelector(".author_picture");
      const pictureYear = document.querySelector(".picture_year");
      let nextImg = document.querySelector(".next_img");
      //score cards data
      const cardsThemeScore = document.querySelectorAll(".card_theme_score");
      const selectionAnswersScore = document.querySelectorAll(
        ".selection_answer_score"
      );

      cardsThemeScore[index].classList.add("active_card");

      if (indicator === false) {
        console.log("false", selectionAnswer);
        selectionAnswer.classList.add("false");
        // add marker for score card
        if (selectionAnswersScore[index].classList.contains("true")) {
          selectionAnswersScore[index].classList.remove("true");
        }
        selectionAnswersScore[index].classList.add("false");
      } else {
        console.log("true", selectionAnswer);
        selectionAnswer.classList.remove("false");
        // add marker for score card
        if (selectionAnswersScore[index].classList.contains("false")) {
          selectionAnswersScore[index].classList.remove("false");
        }
        selectionAnswersScore[index].classList.add("true");
      }
      nextImg.src = `/src/assets/full/${data[index].imageNum}full.jpg`;
      pictureAbout.textContent = data[index].name;
      authorPicture.textContent = data[index].author;
      pictureYear.textContent = data[index].year;
      console.log("111", rightAnswer, userAnswer, indicator);

      //right on the card answer
      const countAnswer = document.querySelectorAll(".count_answer");
      countAnswer[cardThemeId].textContent = `${countRightAnswer}/10`;

      // // mix card, ind++
      // index++;

      console.log("index", index);
      console.log("odjAnswer.answerPicture", odjAnswer.answerPicture);
    }
  }

  // function getTimer() {
  //timer
  // let time;
  // const timerContainer = document.querySelector(".timer_container");
  // let timers = document.querySelectorAll(".timer");

  // if (timerContainer.classList.contains("hidden")) {
  //   return;
  // } else {
  //   // let tik = timeGame.textContent;
  //   time = setInterval(func, 1000);
  //   function func() {
  //     tik--;
  //     timers.forEach((timer) => {
  //       timer.textContent = String(tik).padStart(2, 0);
  //     });
  //     console.log("tik", tik);
  //     if (tik === 0) {
  //       clearInterval(time);
  //     }
  //   }
  // }
  // }

  /// //handler next btn
  const nextBtn = document.querySelector(".next_btn");
  nextBtn.addEventListener("click", getNewQuestion);
  async function getNewQuestion(e) {
    buttonPress.play();
    // tik = timeGame.textContent;
    // clearInterval(time);
    // tik = timeGame.textContent;
    // func();

    // mix card, ind++
    index++;
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

    console.log("countDots", countDots);
    let dots = document.querySelectorAll(".dot");
    if (nameCategory === "artist") {
      dots = document.querySelectorAll(".artist_dot");
    } else if (nameCategory === "picture") {
      dots = document.querySelectorAll(".picture_dot");
    }

    for (let i = 0; i <= countDots; i++) {
      dots[i].classList.add("active_btn");
    }

    countDots++;

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

    if (countDots === 10) {
      congratulationsPopup.classList.add("visiblePopup");
      if (countRightAnswer <= 4) {
        titlePopup.textContent = "Try again";
        won3.play();
      } else if (countRightAnswer === 10) {
        titlePopup.textContent = "great result!";
        won2.play();
        // grandPopup.classList.add("visiblePopup");
      } else {
        titlePopup.textContent = "Congratulation!";
        won1.play();
      }
    }
    // cardThemeId = +cardThemeId + 1;
    // if (cardThemeId === 11) {
    //   cardThemeId = 0;
    // }
  }
  function getNewIndex() {
    cardThemeId = +cardThemeId + 1;
    if (cardThemeId === 11) {
      cardThemeId = 0;
    }
    let newIndex = cardThemeId * 10;
    index = newIndex;
    console.log("newIndex", newIndex);
    const countAnswer = document.querySelectorAll(".count_answer");
    if (nameCategory === "artist") {
      const artists = document.querySelectorAll(".artist");
      if (artists[cardThemeId].classList.contains("active_category")) {
        return;
      } else {
        artists[cardThemeId].classList.add("active_category");
        if (cardThemeId) {
        }
      }
    } else if (nameCategory === "picture") {
      let pictures = document.querySelectorAll(".picture");
      if (pictures[cardThemeId].classList.contains("active_category")) {
        return;
      } else {
        pictures[cardThemeId].classList.add("active_category");
        if (cardThemeId) {
        }
      }
    }
  }
  //handler next quiz
  const nextQuizBtn = document.querySelector(".next_quiz_btn");
  nextQuizBtn.addEventListener("click", getNewQuiz);
  function getNewQuiz(e) {
    buttonPress.play();
    getNewIndex();
    console.log("indexNew quiz", index);
    console.log("cardThemeId", cardThemeId);
    if (index === 110) {
      index = 0;
    }
    const congratulationsPopup = document.querySelector(
      ".congratulations_popup"
    );
    congratulationsPopup.classList.remove("visiblePopup");
    getGame(e);
  }
  //handler home btn congratulations_btn
  const congratulationsBtn = document.querySelector(".congratulations_btn");
  congratulationsBtn.addEventListener("click", () => {
    buttonPress.play();
    getNewIndex();
  });
}
renderGame();
