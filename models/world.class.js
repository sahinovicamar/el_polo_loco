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

    intervalIds = [];

    level = level1;
    enemies = level1.enemies;
    endBoss = level1.endBoss;
    clouds = level1.clouds;
    coins = level1.coins;
    bottles = level1.bottles;

    bottleIsThrown = false;
    // chickenIsDead = false;

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
        this.ctx.translate(this.camera_x, 0);
        this.mapObjects();
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0); 
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
        mo.drawHitbox(this.ctx)
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
            throwBottleSound.play();
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
        if (this.character.jumpOnChicken(enemy)) {
            if (enemy instanceof Chicken) {
                enemy.chickenIsDead();
                // enemy.stopIntervals();
                enemy.dead = true;
                enemyDeadSound.play();
                // this.chickenRemove();

                // debugger;

                setTimeout(() => {
                    const enemyToRemove = this.level.enemies.indexOf(enemy);
                    this.level.enemies.splice(enemyToRemove, 1);
                    console.log('dead enemy', enemyToRemove)
                }, 500)
            }
        }
    }

    // chickenRemove(enemy) {
        
    //     // this.level.enemies.forEach((enemy) => {
    //         if (enemy.dead) {
    //             setTimeout(() => {
    //                 const enemyToRemove = this.level.enemies.indexOf(enemy);
    //                 this.level.enemies.splice(enemyToRemove, 1);
    //             }, 500)
    //         }
    //     // })
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
                collectCoinSound.play();
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
                collectBottleSound.play();
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
                    bottle.speed = 0;
                    bottle.breakBottle();
                    console.log(endboss.energy);
                }
            });
        });
    }


    checkGameEnd() {
        if (world.endBoss[0].energy <= 0) {
            setTimeout(() => {
                this.gameOver();
                this.endBoss[0].stopIntervalsEndboss();
                this.character.stopIntervalsCharacter();
            }, 500)
            winSound.play();
        }

        if (world.character.energy <= 0) {
            setTimeout(() => {
                this.youLost();
                this.character.stopIntervalsCharacter();
                lostSound.play();
            }, 500)
        }
    }


    gameOver() {
        clearAllIntervals();
        backgroundMusicAudio.pause();
        document.getElementById('gameOverImg').style.display = "block";
        setTimeout(() => {
            document.getElementById('restartBtn').style.display = "flex";
        }, 800)

    }
    

    youLost() {
        clearAllIntervals();
        backgroundMusicAudio.pause();
        document.getElementById('youLostImg').style.display = "block";
        setTimeout(() => {
            document.getElementById('restartBtn').style.display = "flex";
        }, 800)
    }

}
