let navMenu = document.querySelector(".nav_menu");
let burgerMenu = document.querySelector(".menu_burger");
if (burgerMenu) {
  burgerMenu.addEventListener("click", (e) => {
    document.body.classList.toggle("hidden");
    burgerMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
  navMenu.addEventListener("click", (e) => {
    document.body.classList.remove("hidden");
    burgerMenu.classList.remove("active");
    navMenu.classList.remove("active");
  });
}
