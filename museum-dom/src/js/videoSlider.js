let videoAll = document.querySelectorAll(".video");
let btnPlay = document.querySelectorAll(".btn_play");
let imgPlay = document.querySelectorAll(".panel_play");
let fullscreen = document.querySelectorAll(".btn_fullscreen");
let imgFullscreen = document.querySelectorAll(".fullscreen");
let volumeBtn = document.querySelectorAll(".volume_btn");
let imgBtn = document.querySelectorAll(".btn_volume");
let progressVideo = document.querySelectorAll(".panel_play");
let progressVolume = document.querySelectorAll(".progress_audio");

//Play&Pause
for (let i = 0; i < btnPlay.length; i++) {
  btnPlay[i].addEventListener("click", (e) => {
    console.log(btnPlay[i]);
    if (videoAll[i].paused) {
      videoAll[i].play();
      imgPlay.src = "/src/assets/svg/pause.png";
    } else {
      videoAll[i].pause();
      imgPlay.src = "/src/assets/svg/play.png";
    }
  });
}

//slider
$(".slider-for").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: ".slider-nav",
});
$(".slider-nav").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: ".slider-for",
  arrows: true,
  dots: true,
  centerMode: false,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: true,
      },
    },
  ],
});
