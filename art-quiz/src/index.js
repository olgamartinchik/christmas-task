import "./js/audio";

const main = document.querySelector(".main_page");
const settings = document.querySelector(".setting_page");
const main_btn = document.querySelector(".main_btn");
const logo = document.querySelector(".logo");
const sections = document.querySelectorAll("section");
main_btn.addEventListener("click", (e) => {
  main.classList.add("active");
  settings.classList.remove("active");
});
logo.addEventListener("click", toggleMainPage);
function toggleMainPage() {
  sections.forEach((section) => {
    section.classList.add("active");
  });
  main.classList.remove("active");
}
