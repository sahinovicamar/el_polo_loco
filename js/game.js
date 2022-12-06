let canvas;
let world;
let keyboard = new Keyboard();


let backgroundMusicAudio = new Audio('audio/background-music.mp3');
let collectCoinSound = new Audio("audio/collect-coin.mp3");
let collectBottleSound = new Audio("audio/collect-bottle.mp3");
let throwBottleSound = new Audio("audio/throw.mp3");
let enemyDeadSound = new Audio("audio/enemy-dead.mp3");
let walkingSound = new Audio("audio/walking.mp3");
let jumpSound = new Audio("audio/jump.mp3");
let winSound = new Audio("audio/win-sound.mp3");
let lostSound = new Audio("audio/lost-sound.mp3");

let mobilePhone = false;
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let allSounds = [
  // backgroundMusicAudio,
  // collectCoinSound,
  // collectBottleSound,
  // throwBottleSound,
  // enemyDeadSound,
  // walkingSound,
  // jumpSound,
  // winSound,
  // lostSound
];


let intervalIds = [];


function init() {
  canvas = document.getElementById('canvas');
  loading = setTimeout(showPage, 1000);
  mediaMobile();
}


function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("startBtn").style.display = "flex";
  document.getElementById("introImg").style.display = "block";
  document.getElementById("helpCon").style.display = "none";
}


function startGame() {
  initLevel();
  world = new World(canvas, keyboard);
  startGameElements();
  playBackgroundMusic();
  checkIfMobile();
}


function startGameElements() {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("volumeUp").style.display = "block";
  document.getElementById("volumeOff").style.display = "none";
  document.getElementById("musicOn").style.display = "block";
  document.getElementById("musicOff").style.display = "none";
  document.getElementById("helpCon").style.display = "none";
  document.getElementById("refreshBtn").style.display = "block";
  document.getElementById('gameOverImg').style.display = "none";
  document.getElementById('restartBtn').style.display = "none";
  document.getElementById('youLostImg').style.display = "none";
}


function checkIfMobile() {
  if (isMobile) {
    document.getElementById('mobileButtons').style.display = "block";
    fullscreen();
  }
}


function playBackgroundMusic() {
  backgroundMusicAudio.volume = 0.1;
  backgroundMusicAudio.play();
  backgroundMusicAudio.loop = true;
}


function turnMusicOn() {
  backgroundMusicAudio.muted = true;
  document.getElementById("musicOn").style.display = "none";
  document.getElementById("musicOff").style.display = "block";
}


function turnMusicOff() {
  backgroundMusicAudio.muted = false;
  document.getElementById("musicOn").style.display = "block";
  document.getElementById("musicOff").style.display = "none";
}


function turnOn() {
  // allSounds.muted = true;
  collectCoinSound.muted = true;
  collectBottleSound.muted = true;
  throwBottleSound.muted = true;
  enemyDeadSound.muted = true;
  walkingSound.muted = true;
  jumpSound.muted = true;
  winSound.muted = true;
  lostSound.muted = true;
  document.getElementById("volumeUp").style.display = "none";
  document.getElementById("volumeOff").style.display = "block";
}


function turnOff() {
  // allSounds.muted = false;
  collectCoinSound.muted = false;
  collectBottleSound.muted = false;
  throwBottleSound.muted = false;
  enemyDeadSound.muted = false;
  walkingSound.muted = false;
  jumpSound.muted = false;
  winSound.muted = false;
  lostSound.muted = false;
  document.getElementById("volumeUp").style.display = "block";
  document.getElementById("volumeOff").style.display = "none";
}


function setStopableInterval(func, time) {
  let idIntervall = setInterval(func, time);
  intervalIds.push(idIntervall);
}


function clearAllIntervals() {
  for (let i = 1; i < 9999; i++)  window.clearInterval(i);
}


function fullscreen() {
  let fullscreen = document.getElementById('myCanvas');
  enterFullscreen(fullscreen);
}


function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}


function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}


function restartGame() {
  startGame();
}


function showHelp() {
  let toggle = document.getElementById("helpCon");
  if (toggle.style.display === "none") {
    toggle.style.display = "block";
  } else {
    toggle.style.display = "none";
  }
}


function mediaMobile() {
  setInterval(() => {
    if (isMobile) {
      document.getElementById('headline').style.display = "none";
      document.getElementById("myCanvas").style.marginTop = "0";
      document.getElementById("myCanvas").style.height = "100%";
      document.getElementById("canvas").style.height = "100%";
      document.getElementById("canvas").style.width = "100%";
    }
    if (isMobile && screen.width <= 500) {
      document.getElementById("myCanvas").style.display = "none";
      document.getElementById("noticeCon").style.display = "flex";
    } else {
      document.getElementById("myCanvas").style.display = "block";
      document.getElementById("noticeCon").style.display = "none";
    }
  }, 1000)
}


function refresh() {
  location.reload();
}
