import { shuffle } from "./addRandomGallery";

let arrayWelcomeImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
// shuffle(arrayWelcomeImages);

let link = "/src/assets/img/welcome-slider/";
let containerWithBackgroundImg = document.querySelector("#welcome > div");
let imgNum = document.querySelector(".img_number");
let allImgNum = document.querySelector(".all_img");
let dots = document.querySelectorAll(".pagination_img");
let leftArrow = document.querySelector(".left_arrow");
let rightArrow = document.querySelector(".right_arrow");

let slideShow = () => {
  // console.log("dots", dots);
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", (e) => {
      let target = e.target;
      if (target.classList.contains("pagination_img")) {
        for (let j = 0; j < dots.length; j++) {
          dots[j].classList.remove("active");
        }
      }
      dots[i].classList.add("active");
      containerWithBackgroundImg.style.backgroundImage = `url(${link}${arrayWelcomeImages[i]})`;
      let numNextImg = i + 1;
      imgNum.innerHTML = numNextImg;
      allImgNum.innerHTML = arrayWelcomeImages.length - numNextImg;
    });
  }
  leftArrow.addEventListener("click", (e) => {
    let getActiveDot = document.querySelector(".pagination_img.active");

    for (let i = 0; i < dots.length; i++) {
      if (dots[i] === getActiveDot) {
        for (let j = 0; j < dots.length; j++) {
          dots[j].classList.remove("active");
        }
        imgNum.innerHTML = i;
        allImgNum.innerHTML = dots.length - i;
        if (i === 0) {
          dots[dots.length - 1].classList.add("active");
          imgNum.innerHTML = dots.length;
          if ((imgNum.innerHTML = dots.length)) {
            allImgNum.innerHTML = 0;
          }
        } else {
          dots[i - 1].classList.add("active");
        }
        containerWithBackgroundImg.style.backgroundImage = `url(${link}${arrayWelcomeImages[i]})`;
      }
    }
  });
  rightArrow.addEventListener("click", (e) => {
    let getActiveDot = document.querySelector(".pagination_img.active");
    for (let i = 0; i < dots.length; i++) {
      if (dots[i] === getActiveDot) {
        for (let j = 0; j < dots.length; j++) {
          dots[j].classList.remove("active");
        }
        //  console.log(i)
        imgNum.innerHTML = i + 2;
        allImgNum.innerHTML = dots.length - (i + 1);
        if (i === 4) {
          dots[0].classList.add("active");

          if ((imgNum.innerHTML = dots.length)) {
            allImgNum.innerHTML = 0;
          }
          imgNum.innerHTML = 1;
          if ((imgNum.innerHTML = 1)) {
            allImgNum.innerHTML = dots.length;
          }
        } else {
          dots[i + 1].classList.add("active");
        }
        containerWithBackgroundImg.style.backgroundImage = `url(${link}${arrayWelcomeImages[i]})`;
      }
    }
  });
};
slideShow();
