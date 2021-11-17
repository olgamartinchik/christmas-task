const cardsThemeScore = document.querySelectorAll(".card_theme_score");
cardsThemeScore.forEach((card) => {
  card.addEventListener("click", (e) => {
    card.classList.toggle("active_about");
  });
});

function activeSlider() {
  let count = 0;
  const scoreImages = document.querySelectorAll(".score_image");
  console.log(scoreImages);
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
    console.log(count, scoreImages.length);
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
    console.log(count, scoreImages.length);
    scoreImages[count].classList.add("visible_category");
    textSlider.textContent = count + 1;
  });
}
activeSlider();
