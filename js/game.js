let canvas;
let world;
let keyboard = new Keyboard();
// let gameOver;



function init() {
    canvas = document.getElementById('canvas');
    loading = setTimeout(showPage, 1000);
    listenForTouches();
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("startBtn").style.display = "flex";
    document.getElementById("introImg").style.display = "block";
    document.getElementById("helpCon").style.display = "none";
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
    document.getElementById("volumeOff").style.display = "none";
    document.getElementById("helpCon").style.display = "none";
    document.getElementById('gameOverImg').style.display = "none";
    document.getElementById('restartBtn').style.display = "none";
    document.getElementById('youLostImg').style.display = "none";

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
    document.getElementById("volumeUp").style.display = "none";
    document.getElementById("volumeOff").style.display = "block";
    // document.querySelectorAll(Audio).forEach(sA => sA.pause())
}

function turnOff() {
    document.getElementById("volumeUp").style.display = "block";
    document.getElementById("volumeOff").style.display = "none";


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
    if (event.keyCode == 65) {
        keyboard.A = true;
    }
    if (event.keyCode == 87) {
        keyboard.W = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
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
    if (event.keyCode == 65) {
        keyboard.A = false;
    }
    if (event.keyCode == 87) {
        keyboard.W = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
})



function listenForTouches() {
    document.getElementById('buttonLeft').addEventListener('touchstart', (event) => {
        event.preventDefault()
        keyboard.LEFT = true
    })
    
    document.getElementById('buttonLeft').addEventListener('touchend', (event) => {
        event.preventDefault()
        keyboard.LEFT = false
    })
    document.getElementById('buttonBottle').addEventListener('touchstart', (event) => {
        event.preventDefault()
        keyboard.B = true
    })
    
    document.getElementById('buttonBottle').addEventListener('touchend', (event) => {
        event.preventDefault()
        keyboard.B = false
    })
    document.getElementById('buttonJump').addEventListener('touchstart', (event) => {
        event.preventDefault()
        keyboard.UP = true
    })
    
    document.getElementById('buttonJump').addEventListener('touchend', (event) => {
        event.preventDefault()
        keyboard.UP = false
    })
    document.getElementById('buttonRight').addEventListener('touchstart', (event) => {
        event.preventDefault()
        keyboard.RIGHT = true
    })
    
    document.getElementById('buttonRight').addEventListener('touchend', (event) => {
        event.preventDefault()
        keyboard.RIGHT = false
    })
}
