let sliderFor = document.querySelector(".slider-for");
let videoAll = document.querySelectorAll(".video");
let playPaused = document.querySelectorAll(".play_paused");
let btnPlayPaused = document.querySelectorAll(".btn_play");
let btnPlay = document.querySelectorAll(".btn_play");
let imgPlay = document.querySelectorAll(".panel_play");
let fullscreen = document.querySelectorAll(".btn_fullscreen");
let imgFullscreen = document.querySelectorAll(".fullscreen");
let volumeBtn = document.querySelectorAll(".volume_btn");
let imgBtn = document.querySelectorAll(".btn_volume");
let progressVideo = document.querySelectorAll(".panel_play");
let progressVolume = document.querySelectorAll(".progress_audio");

//Play&Pause
sliderFor.addEventListener("click", (e) => {
  let target = e.target;
  console.log(target);
  //   e.stopPropagation();
  if (target.closest("play_paused")) {
    console.log(this.classlist.contains("video"));
    // if (
    //   this.classlist.contains("video") &&
    //   document.querySelector(".video").paused
    // ) {
    //   document.querySelector(".video").play();
    // } else {
    //   document.querySelector(".video").pause();
    // }
  }
});

// for (let i = 0; i < btnPlay.length; i++) {
//   btnPlay[i].addEventListener("click", toggleVideo);
//   //   for (let s = 0; s < videoAll.length; s++) {
//   //     videoAll[s].addEventListener("click", toggleVideo);
//   //   }

//   function toggleVideo(e) {
//     console.log(imgPlay[i].src);
//     if (videoAll[i].paused) {
//       videoAll[i].play();
//       imgPlay[i].src = "/src/assets/svg/pause.png";
//       //   btnPlayPaused[i] = "";
//     } else {
//       videoAll[i].pause();
//       imgPlay[i].src = "/src/assets/svg/play.png";
//       //   btnPlayPaused[i] = "/src/assets/svg/btn-play.svg";
//     }
//   }
// }

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
