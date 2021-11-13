const cardsCategory = document.querySelector(".cards_category");

class CategoryCard {
  constructor(card) {
    this.card = card;
    this.imgs = [
      "30",
      "10",
      "20",
      "40",
      "50",
      "60",
      "70",
      "80",
      "90",
      "100",
      "110",
      "120",
    ];
    this.category = [
      "portrait",
      "landscape",
      "still life",
      "impressionism",
      "expressionism",
      "avant-garde",
      "Renaissance ",
      "Surrealism ",
      "kitsch",
      "minimalism ",
      "nude",
      "interior",
    ];
  }
  crateCardCategory() {
    for (let i = 0; i <= 11; i++) {
      let divWrapper = document.createElement("div");
      divWrapper.classList.add("card", "card_theme");
      divWrapper.id = `${i}`;
      let div = document.createElement("div");
      div.classList.add("score_category");
      let h2 = document.createElement("h2");
      h2.classList.add("count_category");
      h2.textContent = `${i + 1}`;
      let span = document.createElement("span");
      span.classList.add("count_answer");
      span.textContent = `10/10`;
      let p = document.createElement("span");
      p.classList.add("title_card");
      p.textContent = `${this.category[i]}`;
      let img = document.createElement("img");
      img.classList.add("card_img");
      img.src = `/src/assets/img/${this.imgs[i]}.jpg`;
      img.alt = "category image";
      div.appendChild(h2);
      div.appendChild(span);
      divWrapper.appendChild(div);
      divWrapper.appendChild(p);
      divWrapper.appendChild(img);
      this.card.appendChild(divWrapper);
    }
  }
}

new CategoryCard(cardsCategory).crateCardCategory();
