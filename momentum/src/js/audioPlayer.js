import playList from "./playList";
const timeline = document.querySelector(".timeline");
const progressAudio = document.querySelector(".progress_audio");
const playBtn = document.querySelector(".play");
const musicList = document.querySelector(".play-list");
const volume = document.querySelector(".volume");
const volumeline = document.querySelector(".volumeline");
const progressVolume = document.querySelector(".progress_volume");
const lengthAudio = document.querySelector(".length");
const currentLengthAudio = document.querySelector(".current");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
const titleSong = document.querySelector(".title_song");

let isPlay = false;
const audio = new Audio();
let currentIndex = 0;
// loadAudio(playList[currentIndex]);
function loadAudio() {
  const playListItems = document.querySelectorAll(".play-item");
  playListItems.forEach((item) => {
    item.classList.remove("item-active");
  });
  titleSong.textContent = playList[currentIndex].title;
  // audio.src = playList[currentIndex].src;
  playListItems[currentIndex].classList.add("item-active");
}

function playAudio() {
  audio.src = playList[currentIndex].src;
  playBtn.classList.add("pause");
  loadAudio();
  isPlay = true;
  audio.play();
}
function pauseAudio() {
  playBtn.classList.remove("pause");
  isPlay = false;
  audio.pause();
}

playBtn.addEventListener("click", (e) => {
  // audio.src = playList[currentIndex].src;

  if (!isPlay) {
    // audio.currentTime = 0;
    isPlay = true;
    playAudio();
  } else {
    isPlay = false;
    pauseAudio();
  }
});

// next/prev
playPrev.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = playList.length - 1;
  }

  playAudio();
  // loadAudio(playList[currentIndex]);
});
playNext.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > playList.length - 1) {
    currentIndex = 0;
  }

  playAudio();
  loadAudio(playList[currentIndex]);
});

//play list
playList.forEach((el) => {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = el.title;
  musicList.append(li);
});

//audio ended
audio.addEventListener("ended", () => {
  currentIndex++;

  if (currentIndex > playList.length - 1) {
    currentIndex = 0;
  }

  playAudio();
});

//volume
function toggleVolume() {
  if (!audio.muted) {
    audio.muted = true;
  } else {
    audio.muted = false;
  }
  volume.classList.toggle("mute");
}
volume.addEventListener("click", toggleVolume);

//toggle play list
musicList.addEventListener("click", (e) => {
  const playListItems = musicList.childNodes;
  isPlay = true;
  for (let i = 0; i < playListItems.length; i++) {
    if (e.target == playListItems[i]) {
      currentIndex = i;
      playAudio();
    }
  }
});

//audio progress
audio.addEventListener("loadeddata", () => {
  lengthAudio.textContent = getTimeCodeFromNum(audio.duration);
  audio.volume = 0.75;
});

timeline.addEventListener("click", (e) => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
  audio.currentTime = timeToSeek;
});

setInterval(() => {
  progressAudio.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  currentLengthAudio.textContent = getTimeCodeFromNum(audio.currentTime);
}, 400);

//volume progress
volumeline.addEventListener("click", getVolumeProgress);
function getVolumeProgress(e) {
  const volumelineWidth = window.getComputedStyle(volumeline).width;
  const newVolume = e.offsetX / parseInt(volumelineWidth);
  audio.volume = newVolume;
  progressVolume.style.width = newVolume * 100 + "%";
  if (newVolume <= 0.01) {
    volume.classList.add("mute");
  } else {
    volume.classList.remove("mute");
  }
}

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
