import { async } from "regenerator-runtime";
import { getDataForGame } from "./renderGame";
const scoreImagContainer = document.querySelector(".score_image_container");

class ScoreCards {
  constructor(div, imgData) {
    this.div = div;
    this.imgData = imgData;
    this.categories = [
      "portrait",
      "landscape",
      "still-life",
      "impressionism",
      "expressionism",
      "avant-garde",
      "renaissance",
      "surrealism",
      "kitsch",
      "minimalism",
      "nude",
      "interior",
    ];
  }
  generateScoreCards() {
    for (let i = 0; i < this.categories.length; i++) {
      console.log("i", this.categories[i]);
      let scoreImag = document.createElement("div");
      scoreImag.classList.add("score_image", `${this.categories[i]}`);
      let h2 = document.createElement("h2");
      h2.textContent = `${this.categories[i]}`;
      scoreImag.appendChild(h2);
      //container cards
      let cardCategory = document.createElement("div");
      cardCategory.classList.add("cards_category_score", "cards_category");
      scoreImag.appendChild(cardCategory);
      for (let j = i * 10; j < i * 10 + 10; j++) {
        //cards
        let card = document.createElement("div");
        card.classList.add("card", "card_theme_score");
        let scoreCategory = document.createElement("div");
        scoreCategory.classList.add("score_category");
        card.appendChild(scoreCategory);
        //
        let countCategory = document.createElement("h2");
        countCategory.classList.add("count_category");
        countCategory.textContent = `${i + 1}`;
        scoreCategory.appendChild(countCategory);
        let selectionAnswerScore = document.createElement("div");
        selectionAnswerScore.classList.add("selection_answer_score");
        scoreCategory.appendChild(selectionAnswerScore);
        //
        let titleCard = document.createElement("p");
        titleCard.classList.add("title_card");
        titleCard.textContent = `${this.categories[i]}`;
        card.appendChild(titleCard);
        //
        let cardImg = document.createElement("img");
        cardImg.classList.add("card_img");
        cardImg.src = `/src/assets/img/${this.imgData[j].imageNum}.jpg`;
        card.alt = "score img";
        card.appendChild(cardImg);
        let aboutPicture = document.createElement("div");
        aboutPicture.classList.add("about_picture");
        card.appendChild(aboutPicture);
        let pictureAbout = document.createElement("p");
        pictureAbout.classList.add("picture_about");
        pictureAbout.textContent = `${this.imgData[j].name}`;
        aboutPicture.appendChild(pictureAbout);
        //
        let authorPicture = document.createElement("p");
        authorPicture.classList.add("author_picture");
        authorPicture.textContent = `${this.imgData[j].author}`;
        aboutPicture.appendChild(authorPicture);
        //
        let pictureYear = document.createElement("p");
        pictureYear.classList.add("picture_year");
        pictureYear.textContent = `${this.imgData[j].year}`;
        aboutPicture.appendChild(pictureYear);

        //
        cardCategory.appendChild(card);
      }
      //

      this.div.appendChild(scoreImag);
    }
    return this.div;
  }
}

export async function getScoreCard() {
  const imgData = await getDataForGame();
  new ScoreCards(scoreImagContainer, imgData).generateScoreCards();

  const cardsThemeScore = document.querySelectorAll(".card_theme_score");
  cardsThemeScore.forEach((card) => {
    card.addEventListener("click", async (e) => {
      card.classList.toggle("active_about");
    });
  });
  console.log("scoreImagContainer", scoreImagContainer);

  console.log("imgData", imgData);
}
