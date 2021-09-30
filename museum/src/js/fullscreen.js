let discoveryBtn = document.querySelector(".welcome_btn");
let iframeFullScreen = document.getElementById("fullscreen");

// let fullscreen = () => {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//     iframeFullScreen.style.display = "none";
//   }
discoveryBtn.addEventListener("click", () => {
  iframeFullScreen.style.display = "block";
  iframeFullScreen.requestFullscreen();
  // if (document.exitFullscreen) {
  //   document.exitFullscreen();
  //   iframeFullScreen.style.display = "none";
  // }
});
// };
