import { async } from "regenerator-runtime";
import { getScoreCard } from "./getScoreCard";
//

async function activeSlider() {
  await getScoreCard();
  let count = 0;
  const scoreImages = document.querySelectorAll(".score_image");
  // console.log(scoreImages);
  scoreImages[count].classList.add("visible_category");

  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const textSlider = document.querySelector(".text_slider");

  next.addEventListener("click", () => {
    scoreImages.forEach((img) => {
      img.classList.remove("visible_category");
    });
    count++;

    if (count === scoreImages.length) {
      count = 0;
    }
    // console.log(count, scoreImages.length);
    scoreImages[count].classList.add("visible_category");
    textSlider.textContent = count + 1;
  });
  prev.addEventListener("click", () => {
    scoreImages.forEach((img) => {
      img.classList.remove("visible_category");
    });
    count--;
    if (count === -1) {
      count = scoreImages.length - 1;
    }
    // console.log(count, scoreImages.length);
    scoreImages[count].classList.add("visible_category");
    textSlider.textContent = count + 1;
  });
}

activeSlider();

function toggleCategoryToScore() {
  const scoreBtn = document.querySelector(".score_btn");
  const categoryBtn = document.querySelector(".category_btn");
  const scoreGame = document.querySelector(".score_game");
  const categoryPage = document.querySelector(".category_page");
  scoreBtn.addEventListener("click", () => {
    scoreGame.classList.remove("hidden_section");
    categoryPage.classList.add("hidden_section");
  });
  categoryBtn.addEventListener("click", () => {
    scoreGame.classList.add("hidden_section");
    categoryPage.classList.remove("hidden_section");
  });
}
toggleCategoryToScore();
