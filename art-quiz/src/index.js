import "./js/settings";
import "./js/generateCategoryCard";
import "./js/renderGame";
import "./js/generateCardGame";

const main = document.querySelector(".main_page");
const settings = document.querySelector(".setting_page");
const main_btn = document.querySelector(".main_btn");
const logo = document.querySelector(".logo");
const sections = document.querySelectorAll("section");
const homeBtns = document.querySelectorAll(".home_btn");
const categoryGame = document.querySelectorAll(".category_game");
const cardsCategory = document.querySelectorAll(".cards_category");
main_btn.addEventListener("click", (e) => {
  main.classList.add("hidden_section");
  settings.classList.remove("hidden_section");
});
logo.addEventListener("click", toggleMainPage);
homeBtns.forEach((homeBtn) => {
  homeBtn.addEventListener("click", toggleMainPage);
});

function toggleMainPage() {
  sections.forEach((section) => {
    section.classList.add("hidden_section");
  });
  cardsCategory.forEach((category) => {
    category.classList.add("hidden_section");
  });
  main.classList.remove("hidden_section");
  categoryGame.forEach((category) => {
    category.classList.remove("active_game");
  });
}
