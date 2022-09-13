class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    // coins = new Coins();
    statusBarCoins = new StatusBarCoins();
    throwableObjects = new ThrowableObject();
    coins = level1.coins;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkCoins();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)) {
                    console.log('Collision with Character', enemy);
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy)
                    console.log('Collision with Character, energy', this.character.energy)
                }
            })
        }, 200);
    }


    checkCoins() {
        setInterval(() => {
            this.level.coins.forEach((coin) => {
                if(this.character.isColliding(coin)) {
                    console.log('Collision with Coin', coin);
                }
            })
        }, 1000);
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0); // wenn nur (this.camera_x) dann wird nicht geladen, man  mus die y Achse auch nennen

        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0); //Back

        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        // this.addToMap(this.statusBarCoins);


        this.addToMap(this.character); //Forwards        
        this.addObjectsToMap(this.level.enemies);
        // this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);

        //draw() wird immer wieder ausgeführt
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)

        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}