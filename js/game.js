let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    loading = setTimeout(showPage, 1000);

}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("startBtn").style.display = "flex";
    document.getElementById("introImg").style.display = "block";
}

function startGame() {
    // gameOver = false;
    // if (soundOn == true) {
    //     pepeStartMP3.play();
    // }

    initLevel();
    world = new World(canvas, keyboard);
    startGameElements();
}

function startGameElements() {
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("volumeUp").style.display = "block";
    // document.getElementById("volumeOff").style.display = "block";
    document.getElementById('gameOverImg').style.display = "none";
    document.getElementById('restartBtn').style.display = "none";
    document.getElementById('youLostImg').style.display = "none";

}


function restartGame() {
    // endSoundOnRestart();
    startGame();
}

window.addEventListener("keydown", (event) => {

    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.down = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 66) {
        keyboard.B = true;
    }

})

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.down = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 66) {
        keyboard.B = false;
    }

})

// function listenForTouches() {
//     document.getElementById('touch-move-left').addEventListener('touchstart', (e) => {
//         e.preventDefault()
//         keyboard.LEFT = true
//     })
    
//     document.getElementById('touch-move-left').addEventListener('touchend', (e) => {
//         e.preventDefault()
//         keyboard.LEFT = false
//     })

//     document.getElementById('throw-bottle').addEventListener('touchstart', (e) => {
//         e.preventDefault()
//         keyboard.D = true
//     })
    
//     document.getElementById('throw-bottle').addEventListener('touchend', (e) => {
//         e.preventDefault()
//         keyboard.D = false
//     })

//     document.getElementById('jump-up').addEventListener('touchstart', (e) => {
//         e.preventDefault()
//         keyboard.SPACE = true
//     })
    
//     document.getElementById('jump-up').addEventListener('touchend', (e) => {
//         e.preventDefault()
//         keyboard.SPACE = false
//     })

//     document.getElementById('touch-move-right').addEventListener('touchstart', (e) => {
//         e.preventDefault()
//         keyboard.RIGHT = true
//     })
    
//     document.getElementById('touch-move-right').addEventListener('touchend', (e) => {
//         e.preventDefault()
//         keyboard.RIGHT = false
//     })
// }