class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    B = false;

    constructor() {
        this.buttonsForTouches();
        this.buttonsForKeyboard();
    }

    buttonsForKeyboard() {
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
    }


    buttonsForTouches() {
        setTimeout(() => {
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
        }, 500);
    }
}

