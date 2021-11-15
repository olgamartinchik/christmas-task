const volume = document.querySelector(".volume_btn_off");
const volumeline = document.querySelector(".volumeline");
const progressVolume = document.querySelector(".progress_volume");
const checkbox = document.querySelector("#checkbox1");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const timeGame = document.querySelector(".time_game");
const saveBtn = document.querySelector(".save_btn");
const defaultBtn = document.querySelector(".default_btn");
const timers = document.querySelectorAll(".timer");
const timersContainer = document.querySelectorAll(".timer_container");

const settingsData = {
  volumeline: "volumeline",
  volumeBtn: "volume_btn_off",
  checkbox: false,
  timeGame: count,
};
let count = 5;
const audio = new Audio();
// audio.src = "/src/assets/audio/2.mp3";

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
}
//volume
function toggleVolume() {
  volume.classList.toggle("volume_btn_on");
  console.log("settingsData", settingsData);
  if (volume.classList.contains("volume_btn_on")) {
    // audio.play();
    volumeline.classList.add("visible");
  } else {
    // audio.pause();
    volumeline.classList.remove("visible");
  }
}
volume.addEventListener("click", toggleVolume);

plus.addEventListener("click", (e) => {
  count = count + 5;
  if (count >= 30) {
    count = 30;
  }
  timeGame.textContent = count;
  timers.forEach((timer) => {
    timer.textContent = timeGame.textContent;
  });
});
minus.addEventListener("click", (e) => {
  count = count - 5;
  if (count <= 5) {
    count = 5;
  }
  timeGame.textContent = count;
  timers.forEach((timer) => {
    timer.textContent = timeGame.textContent;
  });
});

defaultBtn.addEventListener("click", (e) => {
  if (volumeline.classList.contains("visible")) {
    volumeline.classList.remove("visible");
  }
  volume.className = "volume_btn_off";
  checkbox.checked = false;
  timeGame.textContent = 5;
  timers.forEach((timer) => {
    timer.textContent = timeGame.textContent;
  });
  timersContainer.forEach((timerContainer) => {
    timerContainer.classList.add("hidden");
  });
  settingsData.volumeline = volumeline.classList.value;
  settingsData.volumeBtn = volume.classList.value;
  settingsData.checkbox = false;
  settingsData.timeGame = timeGame.textContent;

  localStorage.setItem("settingsData", JSON.stringify(settingsData));
  console.log("settingsData", settingsData);
});
saveBtn.addEventListener("click", (e) => {
  console.log("volumeline", volumeline.classList, "volume", volume.classList);
  settingsData.volumeline = volumeline.classList.value;
  settingsData.volumeBtn = volume.classList.value;
  settingsData.checkbox = checkbox.checked;
  settingsData.timeGame = count;
  localStorage.setItem("settingsData", JSON.stringify(settingsData));
  console.log("settingsData!!!", settingsData);
});

checkbox.addEventListener("change", (e) => {
  if (checkbox.checked === true) {
    timersContainer.forEach((timerContainer) => {
      timerContainer.classList.remove("hidden");
    });
  } else if (checkbox.checked === false) {
    timersContainer.forEach((timerContainer) => {
      timerContainer.classList.add("hidden");
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("settingsData")) {
    console.log(JSON.parse(localStorage.getItem("settingsData")));
    const localSettings = JSON.parse(localStorage.getItem("settingsData"));
    volumeline.className = localSettings.volumeline;
    volume.className = localSettings.volumeBtn;
    checkbox.checked = localSettings.checkbox;
    timers.forEach((timer) => {
      timer.textContent = localSettings.timeGame;
    });
    timeGame.textContent = localSettings.timeGame;
    if (localSettings.checkbox === true) {
      timersContainer.forEach((timerContainer) => {
        timerContainer.classList.remove("hidden");
      });
    } else {
      timersContainer.forEach((timerContainer) => {
        timerContainer.classList.add("hidden");
      });
    }
  }
});
