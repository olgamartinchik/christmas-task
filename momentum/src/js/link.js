const link = document.querySelector(".link");
const linkWrapper = document.querySelector(".link_wrapper");
const linkContainer = document.querySelector(".link_container");

link.addEventListener("click", () => {
  linkWrapper.classList.add("active");
});

window.addEventListener("click", (e) => {
  if (e.target === linkWrapper) {
    linkWrapper.classList.remove("active");
  }
});
