// const artistQuizWrapper = document.querySelector(".artists_quiz_wrapper");
const pictureQuizWrapper = document.querySelector(".picture_quiz_wrapper");
// const answer = ["rrrr", "bbbb", "hhhh", "hhhh"];
export class CardGame {
  constructor(div, answers, index = 0) {
    this.div = div;
    this.answers = answers;
    this.index = index;
  }
  generateArtistCategory() {
    //
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img_container");
    this.div.appendChild(imgContainer);
    let img = document.createElement("img");
    img.classList.add("full_img");
    img.src = `/src/assets/full/${this.index}full.jpg`;
    img.alt = "picture";
    imgContainer.appendChild(img);
    let dotsContainer = document.createElement("div");
    dotsContainer.classList.add("dots_container");
    this.div.appendChild(dotsContainer);
    let firstDot = document.createElement("div");
    firstDot.classList.add("dot", "active_btn");
    dotsContainer.appendChild(firstDot);
    for (let i = 0; i <= 9; i++) {
      let dot = document.createElement("div");
      dot.classList.add("dot");
      dotsContainer.appendChild(dot);
    }
    imgContainer.appendChild(dotsContainer);
    let answer = document.createElement("div");
    answer.classList.add("answer");
    this.answers.forEach((el, ind) => {
      let pictureAnswer = document.createElement("div");
      pictureAnswer.classList.add("picture_answer");
      pictureAnswer.id = ind;
      pictureAnswer.innerText = el;
      answer.appendChild(pictureAnswer);
    });
    this.div.appendChild(answer);
    return this.div;
  }
  generatePictureCategory() {
    //
  }
}

// new CardGame(artistQuiz, answer, "0").generateArtistCategory();
