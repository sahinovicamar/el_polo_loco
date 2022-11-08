let canvas;
let world;
let keyboard = new Keyboard();
// let gameOver;

let backgroundMusicAudio = new Audio('audio/background-music.mp3');
let collectCoinSound = new Audio("audio/collect-coin.mp3");
let collectBottleSound = new Audio("audio/collect-bottle.mp3");
let throwBottleSound = new Audio("audio/throw.mp3");
let enemyDeadSound = new Audio("audio/enemy-dead.mp3");
let walkingSound = new Audio("audio/walking.mp3");
let jumpSound = new Audio("audio/jump.mp3");
let winSound = new Audio("audio/win-sound.mp3");
let lostSound = new Audio("audio/lost-sound.mp3");

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
}

function startGameElements() {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("volumeUp").style.display = "block";
  document.getElementById("volumeOff").style.display = "none";
  document.getElementById("helpCon").style.display = "none";
  document.getElementById('gameOverImg').style.display = "none";
  document.getElementById('restartBtn').style.display = "none";
  document.getElementById('youLostImg').style.display = "none";

}

function playBackgroundMusic() {
  backgroundMusicAudio.volume = 0.1;
  backgroundMusicAudio.play();
  backgroundMusicAudio.loop = true;
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

//   enterFullscreen(document.documentElement);               // ganze Seite
//   enterFullscreen(document.getElementById("videoPlayer"));

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}


function restartGame() {
  // endSoundOnRestart();
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

function turnOn() {
  backgroundMusicAudio.muted = true;
  document.getElementById("volumeUp").style.display = "none";
  document.getElementById("volumeOff").style.display = "block";
}

function turnOff() {
  backgroundMusicAudio.muted = false;
  document.getElementById("volumeUp").style.display = "block";
  document.getElementById("volumeOff").style.display = "none";
}

function mediaMobile() {
  let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  setInterval(() => {
    if (isMobile & screen.width <= 1000) {
      document.getElementById('mobileButtons').style.display = "block";
      document.getElementById('headline').style.display = "none";
      document.getElementById("myCanvas").style.marginTop = "0";
      document.getElementById("myCanvas").style.height = "100%";
      document.getElementById("canvas").style.height = "100%";
      document.getElementById("canvas").style.width = "720px";
    //   if (window.matchMedia("(orientation: landscape)").matches) {
    //     // you're in LANDSCAPE mode
    //     // fullscreen();
    //  }
    }
    if (isMobile & screen.width <= 500) {
      document.getElementById("myCanvas").style.display = "none";
      document.getElementById("noticeCon").style.display = "flex";
      // console.log(isMobile)
    } else {
      document.getElementById("myCanvas").style.display = "block";
      document.getElementById("noticeCon").style.display = "none";
      // console.log(isMobile)
    }
  }, 1000)

}




function refresh() {
  location.reload();
}

