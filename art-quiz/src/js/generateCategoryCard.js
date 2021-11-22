// const cardsCategory = document.querySelector(".cards_category");

export class CategoryCard {
  constructor(div, nameCategory) {
    this.div = div;
    this.nameCategory = nameCategory;
    this.imgs = [
      "10",
      "20",
      "30",
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
    this.category = [];
    if (localStorage.getItem("settingsData")) {
      const localSettings = JSON.parse(localStorage.getItem("settingsData"));
      let en = localSettings.enChecked;
      let ru = localSettings.ruChecked;
      this.category =
        en === true
          ? [
              "сlassicism",
              "landscape",
              "still-life",
              "realism",
              "cubism",
              "avant-garde",
              "renaissance",
              "surrealism",
              "kitsch",
              "minimalism",
              "nude",
              "interior",
            ]
          : [
              "классицизм",
              "пейзаж",
              "натюрморт",
              "pеализм",
              "Кубизм",
              "авангард",
              "Ренессанс ",
              "cюрреализм",
              "китч",
              "минимализм",
              "нюд",
              "интерьер",
            ];
    } else {
      this.category = [
        "сlassicism",
        "landscape",
        "still-life",
        "realism",
        "cubism",
        "avant-garde",
        "renaissance",
        "surrealism",
        "kitsch",
        "minimalism",
        "nude",
        "interior",
      ];
    }
  }

  crateCardCategory() {
    for (let i = 0; i <= 11; i++) {
      let divWrapper = document.createElement("div");
      divWrapper.classList.add("card", "card_theme", this.nameCategory);
      divWrapper.id = `${i}`;
      let div = document.createElement("div");
      div.classList.add("score_category");
      let h2 = document.createElement("h2");
      h2.classList.add("count_category");
      h2.textContent = `${i + 1}`;
      let span = document.createElement("span");
      span.classList.add("count_answer", `${this.nameCategory}_count_answer`);
      span.textContent = `00/10`;
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
      this.div.appendChild(divWrapper);
    }
    return this.div;
  }
}
// new CategoryCard(cardsCategory).crateCardCategory();
