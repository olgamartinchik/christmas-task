const audioContainer = document.querySelector(".audio_container");

const audioGameOver = new Audio();
audioGameOver.classList.add("audio", "audioGameOver");
audioGameOver.src = "/src/assets/audio/game_over.mp3";
let buttonPress = new Audio();
buttonPress.classList.add("audio", "buttonPress");
buttonPress.src = "/src/assets/audio/button2.mp3";
const won1 = new Audio();
won1.classList.add("audio", "won1");
won1.src = "/src/assets/audio/game-won.mp3";
const won2 = new Audio();
won2.classList.add("audio", "won2");
won2.src = "/src/assets/audio/zvuk-pobedyi-vyiigryisha.mp3";
const won3 = new Audio();
won3.classList.add("audio", "won3");
won3.src = "/src/assets/audio/finish_game.mp3";
const soundAir = new Audio();
soundAir.classList.add("audio", "soundAir");
soundAir.src = "/src/assets/audio/zvuk-dvijeniya-vozduha.mp3";
audioContainer.appendChild(audioGameOver);
audioContainer.appendChild(buttonPress);
audioContainer.appendChild(won1);
audioContainer.appendChild(won2);
audioContainer.appendChild(won3);
audioContainer.appendChild(soundAir);
