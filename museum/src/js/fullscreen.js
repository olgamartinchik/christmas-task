let discoveryBtn = document.querySelector(".welcome_btn");
let iframeFullScreen = document.getElementById("fullscreen");

discoveryBtn.addEventListener("click", () => {
  iframeFullScreen.style.display = "block";
  iframeFullScreen.requestFullscreen();
});
