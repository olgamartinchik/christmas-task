import { async } from "regenerator-runtime";
import { CategoryCard } from "./generateCategoryCard";
import { CardGame } from "./generateCardGame";
import { isMuted } from "./settings";
import { getQuizData } from "./getQuizData";

const mainPage = document.querySelector(".main_page");
const categoryPage = document.querySelector(".category_page");
const cardsCategory = document.querySelectorAll(".cards_category");
const artistCardsCategory = document.querySelector(".category_artist");
const pictureCardsCategory = document.querySelector(".category_picture");
const categoriesGame = document.querySelector(".categories_game");
const artistsQuizPage = document.querySelector(".artists_quiz");
const pictureQuiz = document.querySelector(".picture_quiz");
const answerContainerArtist = document.querySelector(
  ".answer_container_artist"
);
const answerContainerPicture = document.querySelector(
  ".answer_container_picture"
);

const audioGameOver = document.querySelector(".audioGameOver");
const buttonPress = document.querySelector(".buttonPress");
const won1 = document.querySelector(".won1");
const won2 = document.querySelector(".won2");
const won3 = document.querySelector(".won3");
const soundAir = document.querySelector(".soundAir");
const choice = document.querySelector(".choice");
//timer
function startTimer(timer, tik, timers) {
  const timerContainer = document.querySelector(".timer_container");
  const timeGame = document.querySelector(".time_game");
  if (timerContainer.classList.value === "timer_container") {
    tik = timeGame.textContent;
    timer = setInterval(func, 1000);
    function func() {
      tik--;
      timers.forEach((timer) => {
        timer.textContent = String(tik).padStart(2, 0);
      });
      console.log("tik", tik);
      if (tik === 0) {
        clearInterval(timer);
      }
      //gameover popup
      const gameOverPopup = document.querySelector(".game_over_popup");
      const popups = document.querySelectorAll(".popup");
      if (tik === 0) {
        if (isMuted === false) {
          won3.play();
        } else {
          won3.pause();
        }
        popups.forEach((popup) => {
          popup.classList.remove("visiblePopup");
        });
        gameOverPopup.classList.add("visiblePopup");
      }
    }
  }
}

//get data
export async function getDataForGame() {
  let url = "/src/js/dataEn.json";
  if (localStorage.getItem("settingsData")) {
    const localSettings = JSON.parse(localStorage.getItem("settingsData"));
    let en = localSettings.enChecked;
    let ru = localSettings.ruChecked;
    url = en === true ? "/src/js/dataEn.json" : "/src/js/dataRu.json";
  }

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

const quizData = {
  activeCardArtist: [],
  activeCardPicture: [],
  countRightAnswerArtist: [],
  countRightAnswerPicture: [],
};
if (localStorage.getItem("quizData")) {
  const quizDataLocalStorage = JSON.parse(localStorage.getItem("quizData"));
  quizDataLocalStorage.activeCardArtist.forEach((artistInd) => {
    if (artistInd !== "") {
      quizData.activeCardArtist.push(artistInd);
    }
  });
  quizDataLocalStorage.activeCardPicture.forEach((pictureInd) => {
    if (pictureInd !== "") {
      quizData.activeCardPicture.push(pictureInd);
    }
  });
  quizDataLocalStorage.countRightAnswerArtist.forEach((count) => {
    quizData.countRightAnswerArtist.push(count);
  });
  quizDataLocalStorage.countRightAnswerPicture.forEach((count) => {
    quizData.countRightAnswerPicture.push(count);
  });
}
const scoreData = {
  activeCard: [],
  true: [],
  false: [],
};

if (localStorage.getItem("scoreData")) {
  const scoreDataLocal = JSON.parse(localStorage.getItem("scoreData"));
  scoreDataLocal.activeCard.forEach((card) => {
    scoreData.activeCard.push(card);
  });
  scoreDataLocal.false.forEach((unCorrectAnswer) => {
    scoreData.false.push(unCorrectAnswer);
  });
  scoreDataLocal.true.forEach((correctAnswer) => {
    scoreData.true.push(correctAnswer);
  });
}

const odjAnswer = {};
odjAnswer.answerArtist = [];
odjAnswer.answerPicture = [];
export let nameCategory = "";

//handler  categoriesGame
categoriesGame.addEventListener("click", getCategory);

async function getCategory(e) {
  if (isMuted === false) {
    soundAir.play();
  } else {
    soundAir.pause();
  }

  const cardCategory = e.target.parentNode;
  if (cardCategory.classList.contains("category_game")) {
    // console.log("yes");
    cardCategory.classList.add("active_game");
  }

  if (cardCategory.classList.contains("artists_game", "active_game")) {
    mainPage.classList.add("hidden_section");
    categoryPage.classList.remove("hidden_section");
    nameCategory = "artist";
    // console.log("artists_game");
    artistCardsCategory.classList.remove("hidden_section");
    if (artistCardsCategory.innerHTML.length === 0) {
      new CategoryCard(artistCardsCategory, nameCategory).crateCardCategory();
    }
    getQuizData();
  } else if (cardCategory.classList.contains("pictures_game", "active_game")) {
    mainPage.classList.add("hidden_section");
    categoryPage.classList.remove("hidden_section");
    nameCategory = "picture";
    // console.log("pictures_game");
    pictureCardsCategory.classList.remove("hidden_section");
    if (pictureCardsCategory.innerHTML.length === 0) {
      pictureCardsCategory.classList.remove("hidden_section");
      new CategoryCard(pictureCardsCategory, nameCategory).crateCardCategory();
    }
    getQuizData();
  }
}

async function renderGame() {
  const timeGame = document.querySelector(".time_game");
  const timerContainer = document.querySelector(".timer_container");
  let timers = document.querySelectorAll(".timer");

  let data = await getDataForGame();
  let index = 0;
  let countDots = 0;
  let countRightAnswer = Number(-1);
  let cardThemeId;
  let tik;
  let timer;

  // handler cardsCategory
  cardsCategory.forEach((card) => {
    card.addEventListener("click", getGame);
  });
  async function getGame(e) {
    let data = await getDataForGame();
    if (isMuted === false) {
      choice.play();
    } else {
      choice.pause();
    }
    startTimer(timer, tik, timers);

    countDots = 0;
    countRightAnswer = 0;
    // console.log("countRightAnswer", countRightAnswer);
    odjAnswer.answerArtist = [];
    odjAnswer.answerPicture = [];
    let cardTheme = e.target.parentNode;
    // console.log("cardTheme", cardTheme.id);
    if (cardTheme.classList.contains("card_theme")) {
      cardTheme.classList.add("active_category");
      // console.log(cardTheme.id);
      cardThemeId = cardTheme.id;
      index = cardTheme.id * 10;
      console.log("index", index);
    }
    let mixObjAnswer = await mixArrayAnswer(index, odjAnswer);
    // console.log("odjAnswer.answerPicture!!!", odjAnswer.answerPicture);
    // console.log("odjAnswer.answerArtist!!!", odjAnswer.answerArtist);
    categoryPage.classList.add("hidden_section");

    if (nameCategory === "artist") {
      // quizData

      if (quizData.activeCardArtist.indexOf(cardTheme.id) === -1) {
        quizData.activeCardArtist.push(cardTheme.id);
      }
      artistsQuizPage.classList.remove("hidden_section");
      answerContainerArtist.innerHTML = "";

      new CardGame(
        answerContainerArtist,
        mixObjAnswer,
        index
      ).generateArtistCategory();
    } else if (nameCategory === "picture") {
      // quizData

      if (quizData.activeCardPicture.indexOf(cardTheme.id) === -1) {
        quizData.activeCardPicture.push(cardTheme.id);
      }

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

    localStorage.setItem("quizData", JSON.stringify(quizData));

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
    clearInterval(timer);
    console.log("index", index);

    if (isMuted === false) {
      buttonPress.play();
    } else {
      buttonPress.pause();
    }

    let data = await getDataForGame();
    const ans = e.target;
    if (ans.classList.contains("ans")) {
      // console.log("nameCategory", nameCategory);
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
      // console.log("countRightAnswer", countRightAnswer);
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

      if (scoreData.activeCard.indexOf(index) === -1) {
        scoreData.activeCard.push(index);
      }
      if (indicator === false) {
        selectionAnswer.classList.add("false");
        // add false marker for score card
        if (selectionAnswersScore[index].classList.contains("true")) {
          selectionAnswersScore[index].classList.remove("true");
        }
        selectionAnswersScore[index].classList.add("false");

        if (scoreData.false.indexOf(index) === -1) {
          if (scoreData.true.indexOf(index)) {
            scoreData.true.splice(index, 1);
          }
          scoreData.false.push(index);
        }
      } else if (indicator === true) {
        selectionAnswer.classList.remove("false");
        // add true marker for score card
        if (selectionAnswersScore[index].classList.contains("false")) {
          selectionAnswersScore[index].classList.remove("false");
        }
        selectionAnswersScore[index].classList.add("true");

        if (scoreData.true.indexOf(index) === -1) {
          if (scoreData.false.indexOf(index)) {
            scoreData.false.splice(index, 1);
          }
          scoreData.true.push(index);
        }
      }

      console.log("index3", index);
      nextImg.src = `/src/assets/full/${data[index].imageNum}full.jpg`;
      pictureAbout.textContent = data[index].name;
      authorPicture.textContent = data[index].author;
      pictureYear.textContent = data[index].year;
      // console.log("111", rightAnswer, userAnswer, indicator);

      //right on the card answer
      if (nameCategory === "picture") {
        const countAnswer = document.querySelectorAll(".picture_count_answer");
        countAnswer[cardThemeId].textContent = `${countRightAnswer}/10`;
        //
        quizData.countRightAnswerPicture = [];
        countAnswer.forEach((ans) => {
          quizData.countRightAnswerPicture.push(ans.textContent);
        });
        // console.log("picture_count_answer", quizData.countRightAnswerPicture);
        localStorage.setItem("ansPicture", JSON.stringify(quizData));
      } else if (nameCategory === "artist") {
        const countAnswer = document.querySelectorAll(".artist_count_answer");
        countAnswer[cardThemeId].textContent = `${countRightAnswer}/10`;
        //
        quizData.countRightAnswerArtist = [];
        countAnswer.forEach((ans) => {
          quizData.countRightAnswerArtist.push(ans.textContent);
        });
        // console.log("picture_count_answer", quizData.countRightAnswerArtist);
        localStorage.setItem("ansArtist", JSON.stringify(quizData));
      }

      // console.log("odjAnswer.answerPicture", odjAnswer.answerPicture);
    }
    localStorage.setItem("scoreData", JSON.stringify(scoreData));
    localStorage.setItem("quizData", JSON.stringify(quizData));
  }

  /// //handler next btn
  const nextBtn = document.querySelector(".next_btn");
  nextBtn.addEventListener("click", getNewQuestion);
  async function getNewQuestion(e) {
    // clearInterval(timer);
    startTimer(timer, tik, timers);

    if (isMuted === false) {
      buttonPress.play();
    } else {
      buttonPress.pause();
    }
    // mix card, ind++
    index++;
    console.log("index2", index);
    const nextPopup = document.querySelector(".next_popup");
    nextPopup.classList.remove("visiblePopup");
    document.body.classList.remove("hidden");
    odjAnswer.answerArtist = [];
    odjAnswer.answerPicture = [];

    let mixObjAnswer = await mixArrayAnswer(index, odjAnswer);
    // console.log(
    //   "1mixObjAnswer",
    //   mixObjAnswer.answerArtist,
    //   mixObjAnswer.answerPicture
    // );
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
    // if (countDots === 10) {
    //   countDots = 0;
    // }

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
        if (isMuted === false) {
          won3.play();
        } else {
          won3.pause();
        }
      } else if (countRightAnswer === 10) {
        titlePopup.textContent = "great result!";
        if (isMuted === false) {
          won2.play();
        } else {
          won2.pause();
        }

        // grandPopup.classList.add("visiblePopup");
      } else {
        titlePopup.textContent = "Congratulation!";
        if (isMuted === false) {
          won1.play();
        } else {
          won1.pause();
        }
      }
    }
  }
  function getNewIndex() {
    cardThemeId = +cardThemeId + 1;
    // if (cardThemeId === 11) {
    //   cardThemeId = 0;
    // }
    if (cardThemeId === 12) {
      cardThemeId = 0;
    }
    let newIndex = cardThemeId * 10;
    index = newIndex;
    console.log("newIndex", newIndex);
    console.log("cardThemeId", cardThemeId);

    if (nameCategory === "artist") {
      const artists = document.querySelectorAll(".artist");

      // if (!artists[cardThemeId].classList.contains("active_category")) {
      artists[cardThemeId].classList.add("active_category");
      // }
    } else if (nameCategory === "picture") {
      const pictures = document.querySelectorAll(".picture");

      // if (!pictures[cardThemeId].classList.contains("active_category")) {
      pictures[cardThemeId].classList.add("active_category");
      // }
    }
  }
  //handler next quiz
  const nextQuizBtn = document.querySelector(".next_quiz_btn");
  nextQuizBtn.addEventListener("click", getNewQuiz);
  function getNewQuiz(e) {
    if (isMuted === false) {
      buttonPress.play();
    } else {
      buttonPress.pause();
    }

    clearInterval(timer);
    startTimer(timer, tik, timers);

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
    if (isMuted === false) {
      buttonPress.play();
    } else {
      buttonPress.pause();
    }

    getNewIndex();
  });

  const yesBtn = document.querySelector(".yes_btn");
  yesBtn.addEventListener("click", (e) => {
    if (isMuted === false) {
      buttonPress.play();
    } else {
      buttonPress.pause();
    }
    const gameOverPopup = document.querySelector(".game_over_popup");
    gameOverPopup.classList.remove("visiblePopup");
    getGame(e);
  });
}
renderGame();
