const volume = document.querySelector(".volume_btn_off");
const volumeline = document.querySelector(".volumeline");
const progressVolume = document.querySelector(".progress_volume");

const audio = new Audio();
audio.src = "/src/assets/audio/2.mp3";

volumeline.addEventListener("click", getVolumeProgress);
function getVolumeProgress(e) {
  const volumelineWidth = window.getComputedStyle(volumeline).width;
  const newVolume = e.offsetX / parseInt(volumelineWidth);
  audio.volume = newVolume;
  progressVolume.style.width = newVolume * 100 + "%";
  //   console.log(progressVolume);
  if (newVolume <= 0) {
    volume.classList.remove("volume_btn_on");
  } else {
    volume.classList.add("volume_btn_on");
  }
  //   if (audio.pause()) {
  //     volume.classList.remove("volume_btn_on");
  //   } else {
  //     volume.classList.add("volume_btn_on");
  //   }
}
//volume
function toggleVolume() {
  volume.classList.toggle("volume_btn_on");
  if (volume.classList.contains("volume_btn_on")) {
    audio.play();
  } else {
    audio.pause();
  }
}
volume.addEventListener("click", toggleVolume);
