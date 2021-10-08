let slide = document.querySelector("#explore_range");
slide.addEventListener("input", (e) => {
  document.querySelector(".explore_after").style.width = +e.target.value + "px";
});
