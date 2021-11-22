import { nameCategory } from "./renderGame";
export function getQuizData() {
  if (localStorage.getItem("quizData")) {
    const quizDataLocalStorage = JSON.parse(localStorage.getItem("quizData"));
    const artistCountAnswer = document.querySelectorAll(".artist_count_answer");
    const pictureCountAnswer = document.querySelectorAll(
      ".picture_count_answer"
    );

    if (nameCategory === "artist") {
      const artistCardQuiz = document.querySelectorAll(".artist");
      if (artistCardQuiz) {
        // console.log("artist", artistCardQuiz);
        quizDataLocalStorage.activeCardArtist.forEach((artistInd) => {
          if (artistInd !== "") {
            if (
              artistCardQuiz[artistInd].classList.contains(
                "active_category"
              ) === false
            ) {
              artistCardQuiz[artistInd].classList.add("active_category");
            }
          }
        });
      }

      quizDataLocalStorage.countRightAnswerArtist.forEach((count, ind) => {
        if (artistCountAnswer) {
          artistCountAnswer.forEach((text, index) => {
            if (ind === index) {
              text.textContent = count;
            }
          });
        }
      });
    } else if (nameCategory === "picture") {
      const pictureCardQuiz = document.querySelectorAll(".picture");
      if (pictureCardQuiz) {
        // console.log("picture", pictureCardQuiz);
        quizDataLocalStorage.activeCardPicture.forEach((pictureInd) => {
          if (pictureInd !== "") {
            if (
              pictureCardQuiz[pictureInd].classList.contains(
                "active_category"
              ) === false
            ) {
              pictureCardQuiz[pictureInd].classList.add("active_category");
            }
          }

          // console.log(
          //   "active_category",
          //   pictureCardQuiz[pictureInd].classList.contains("active_category")
          // );
        });
      }

      quizDataLocalStorage.countRightAnswerPicture.forEach((count, ind) => {
        if (pictureCountAnswer) {
          pictureCountAnswer.forEach((text, index) => {
            if (ind === index) {
              text.textContent = count;
            }
          });
        }
      });
    }
  }
}
