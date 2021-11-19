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
const allAudio = document.querySelectorAll(".audio");
const buttonPress = document.querySelector(".buttonPress");

export let isMuted = true;
const settingsData = {
  volumeline: "volumeline",
  volumeBtn: "volume_btn_off",
  checkbox: false,
  timeGame: count,
  progressVolume: "",
  isMuted: true,
};
let count = 5;

volumeline.addEventListener("click", getVolumeProgress);
function getVolumeProgress(e) {
  const volumelineWidth = window.getComputedStyle(volumeline).width;
  const newVolume = e.offsetX / parseInt(volumelineWidth);
  allAudio.forEach((audio) => {
    audio.volume = newVolume;
  });

  progressVolume.style.width = newVolume * 100 + "%";

  // localStorage.setItem("settingsData", JSON.stringify(settingsData));
  //   console.log(progressVolume);
  if (newVolume <= 0) {
    volume.classList.remove("volume_btn_on");
  } else {
    volume.classList.add("volume_btn_on");
  }
}

plus.addEventListener("click", (e) => {
  if (isMuted === false) {
    buttonPress.play();
  } else {
    buttonPress.pause();
  }
  count = count + 5;
  if (count >= 30) {
    count = 30;
  }
  timeGame.textContent = count;
  timers.forEach((timer) => {
    timer.textContent = String(timeGame.textContent).padStart(2, 0);
  });
});
minus.addEventListener("click", (e) => {
  if (isMuted === false) {
    buttonPress.play();
  } else {
    buttonPress.pause();
  }
  count = count - 5;
  if (count <= 5) {
    count = 5;
  }
  timeGame.textContent = count;
  timers.forEach((timer) => {
    timer.textContent = String(timeGame.textContent).padStart(2, 0);
  });
});

checkbox.addEventListener("change", (e) => {
  if (isMuted === false) {
    buttonPress.play();
  } else {
    buttonPress.pause();
  }
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

saveBtn.addEventListener("click", (e) => {
  if (isMuted === false) {
    buttonPress.play();
  } else {
    buttonPress.pause();
  }

  console.log("volumeline", volumeline.classList, "volume", volume.classList);
  settingsData.volumeline = volumeline.classList.value;
  settingsData.volumeBtn = volume.classList.value;
  settingsData.checkbox = checkbox.checked;
  settingsData.timeGame = count;
  settingsData.progressVolume = progressVolume.style.width;
  settingsData.isMuted = isMuted;
  localStorage.setItem("settingsData", JSON.stringify(settingsData));
  console.log("settingsData!!!", settingsData);
});

defaultBtn.addEventListener("click", (e) => {
  if (volumeline.classList.contains("visible")) {
    volumeline.classList.remove("visible");
  }
  volume.className = "volume_btn_off";
  checkbox.checked = false;
  timeGame.textContent = 5;
  timers.forEach((timer) => {
    timer.textContent = String(timeGame.textContent).padStart(2, 0);
  });
  timersContainer.forEach((timerContainer) => {
    timerContainer.classList.add("hidden");
  });
  if (volume.classList.contains("volume_btn_on")) {
    isMuted = false;
    allAudio.forEach((audio) => {
      audio.muted = false;
    });
    volumeline.classList.add("visible");
  } else {
    isMuted = true;
    allAudio.forEach((audio) => {
      audio.muted = true;
      audio.pause();
    });
  }

  progressVolume.style.width = 75 + "%";

  settingsData.progressVolume = progressVolume.style.width;
  settingsData.volumeline = volumeline.classList.value;
  settingsData.volumeBtn = volume.classList.value;
  settingsData.checkbox = false;
  settingsData.timeGame = timeGame.textContent;
  settingsData.isMuted = isMuted;

  localStorage.setItem("settingsData", JSON.stringify(settingsData));
  console.log("settingsData", settingsData);
});

// toggle volume
function toggleVolume() {
  console.log("buttonPress", buttonPress);
  console.log("audio", allAudio);
  volume.classList.toggle("volume_btn_on");

  console.log("settingsData", settingsData);
  if (volume.classList.contains("volume_btn_on")) {
    isMuted = false;
    allAudio.forEach((audio) => {
      audio.muted = false;
    });
    volumeline.classList.add("visible");
  } else {
    isMuted = true;
    allAudio.forEach((audio) => {
      audio.muted = true;
      audio.pause();
    });

    volumeline.classList.remove("visible");
  }
  if (isMuted === false) {
    buttonPress.play();
  } else {
    buttonPress.pause();
  }
}
volume.addEventListener("click", toggleVolume);

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("settingsData")) {
    // console.log(JSON.parse(localStorage.getItem("settingsData")));
    const localSettings = JSON.parse(localStorage.getItem("settingsData"));
    volumeline.className = localSettings.volumeline;
    volume.className = localSettings.volumeBtn;
    checkbox.checked = localSettings.checkbox;
    progressVolume.style.width = localSettings.progressVolume;
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
    isMuted = localSettings.isMuted;
  }
});
