class World {

    character = new Character();
    coins = new Coins();
    bottles = new Bottles();
    chicken = new Chicken();

    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottle = new StatusBarBottle();

    ThrowableObjects = [];

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    level = level1;
    enemies = level1.enemies;
    endBoss = level1.endBoss;
    clouds = level1.clouds;
    coins = level1.coins;
    bottles = level1.bottles;

    bottleIsThrown = false;

    collectCoinSound = new Audio("audio/collect-coin.mp3");
    collectBottleSound = new Audio("audio/collect-bottle.mp3");
    throwBottleSound = new Audio("audio/throw.mp3");
    enemyDeadSound = new Audio("audio/enemy-dead.mp3");

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

    }

    setWorld() {
        this.character.world = this;
        this.endBoss[0].world = this;
        this.ThrowableObjects.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0); // wenn nur (this.camera_x) dann wird nicht geladen, man  mus die y Achse auch nennen
        this.mapObjects();
        this.addToMap(this.character); //Forwards
        this.ctx.translate(-this.camera_x, 0); //Back
        this.statusBars();
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }


    mapObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endBoss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.ThrowableObjects);
    }

    statusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
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
        // mo.drawFrame(this.ctx) // blue Box
        mo.drawHitbox(this.ctx) // red Box
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    checkIfOffsetExists(mo) {
        return !(
            mo.offset.top == 0 &&
            mo.offset.bottom == 0 &&
            mo.offset.left == 0 &&
            mo.offset.right == 0
        );
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

    run() {
        setInterval(() => {
            this.checkCollisionsChicken();
            this.checkCollisionCoins();
            this.checkCollisionBottles();
            this.checkThrowObjects();
            this.checkCollisionsEndBoss();
            this.checkCollisionsBottlesToBoss();
            this.checkGameEnd();
        }, 50);
    }


    checkThrowObjects() {
        if (
            this.keyboard.B &&
            this.bottleIsThrown == false &&
            this.character.bottlesAmount > 0
        ) {
            this.character.bottlesAmount--;
            this.statusBarBottle.setPercentageBottleBarAmount(
                this.character.bottlesAmount
            );
            this.throwBottle();
            this.throwBottleSound.play();
        }
    }


    throwBottle() {
        this.bottleIsThrown = true;
        let bottle = new ThrowableObject(
            this.character.x + 50,
            this.character.y + 110
        );
        this.ThrowableObjects.push(bottle);
        setTimeout(() => {
            this.bottleIsThrown = false;
        }, 850);
    }


    checkCollisionsChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.jumpOnChicken(enemy)) {
                this.chickenDies(enemy);
            } else if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.dead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }


    chickenDies(enemy) {
        this.enemyDeadSound.pause();
        if (this.character.jumpOnChicken) {
            if (enemy instanceof Chicken) {
                enemy.chickenIsDead();
                enemy.stopIntervals();
                enemy.dead = true;
                this.enemyDeadSound.play();
                // this.chickenRemove();
            }
        }
    }

    // chickenRemove() {
    //     this.level.enemies.forEach((enemy) => {
    //         if (enemy.dead) {
    //             setTimeout(() => {
    //                 const enemyToRemove = this.level.enemies.indexOf(enemy);
    //                 this.level.enemies.splice(enemyToRemove, 1);
    //             })
    //         }
    //     })
    // }


    checkCollisionsEndBoss() {
        this.level.endBoss.forEach((bigBoss) => {
            if (this.character.isColliding(bigBoss)) {
                this.character.oneTouchHit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }


    checkCollisionCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                const coinToRemove = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinToRemove, 1);
                this.character.coinsAmount++;
                this.collectCoinSound.play();
                this.statusBarCoins.setPercentage(this.character.coins);
                this.statusBarCoins.setPercentageCoinBarAmount(
                    this.character.coinsAmount
                );
            }
        });
    }


    checkCollisionBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                const bottleToRemove = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(bottleToRemove, 1);
                this.character.bottlesAmount++;
                this.collectBottleSound.play();
                this.statusBarBottle.setPercentage(this.character.bottles);
                this.statusBarBottle.setPercentageBottleBarAmount(
                    this.character.bottlesAmount
                );
            }
        });
    }


    checkCollisionsBottlesToBoss() {
        this.ThrowableObjects.forEach((bottle) => {
            this.level.endBoss.forEach(endboss => {
                if (bottle.isColliding(endboss)) {
                    this.endBoss[0].hit();
                    // bottle breaking
                    // this.playAnimation(this.IMAGES_BREAKING);
                    // this.ThrowableObjectss.checkThrowableObject();
                     // flasche soll brechen mit Colliding EndBoss
                    console.log(endboss.energy);
                }
            });
        });
    }

    checkGameEnd() {
        if (world.endBoss[0].energy <= 0) {
            this.gameOver();
            this.endBoss[0].stopIntervalsEndboss();
            // console.log("Endboss dead")
            // this.win_sound.play()
        }

        if (world.character.energy <= 0) {
            this.youLost();
            // console.log("you lost")
            // this.lose_sound.play()
        }
    }

    gameOver() {
        document.getElementById('gameOverImg').style.display = "block";
        document.getElementById('restartBtn').style.display = "block";
    }

    youLost() {
        document.getElementById('youLostImg').style.display = "block";
        document.getElementById('restartBtn').style.display = "block";
    }

}
