import { shuffle } from "./addRandomGallery";

let arrayWelcomeImages = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"];

let link = "/src/assets/img/welcome-slider/";
let containerWithBackgroundImg = document.querySelector(
  ".background_container"
);
let imgNum = document.querySelector(".img_number");
let dots = document.querySelectorAll(".pagination_img");
let leftArrow = document.querySelector(".left_arrow");
let rightArrow = document.querySelector(".right_arrow");

let slideShow = () => {
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
        if (i === 0) {
          dots[dots.length - 1].classList.add("active");
          imgNum.innerHTML = dots.length;
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
        imgNum.innerHTML = i + 2;
        if (i === 4) {
          dots[0].classList.add("active");
          imgNum.innerHTML = 1;
        } else {
          dots[i + 1].classList.add("active");
        }
        containerWithBackgroundImg.style.backgroundImage = `url(${link}${arrayWelcomeImages[i]})`;
      }
    }
  });
  //swipe
  let x1 = null;
  let y1 = null;

  containerWithBackgroundImg.addEventListener("touchstart", (e) => {
    const firstTouch = e.touches[0];
    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;
  });

  containerWithBackgroundImg.addEventListener("touchmove", (e) => {
    if (!x1 || !y1) {
      return false;
    }
    let x2 = e.touches[0].clientX;
    let y2 = e.touches[0].clientY;
    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        console.log("right");
        for (let i = 0; i < dots.length; i++) {
          if (dots[i].classList.contains("active")) {
            console.log(dots[i]);
            dots[i].classList.remove("active");
            dots[i + 1].classList.add("active");
            containerWithBackgroundImg.style.backgroundImage = `url(${link}${
              arrayWelcomeImages[i + 1]
            })`;
          }
        }
      } else {
        console.log("left");
      }
    } else {
      if (yDiff > 0) {
        console.log("down");
      } else {
        console.log("top");
      }
    }
    x1 = null;
    y2 = null;
  });
};
slideShow();
