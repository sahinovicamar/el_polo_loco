class World {

    character = new Character();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    coins = new Coins();
    bottles = new Bottles();
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottle = new StatusBarBottle();
    ThrowableObjects = [];

    level = level1;
    enemies = level1.enemies;
    endBoss = level1.endBoss;
    clouds = level1.clouds;
    coins = level1.coins;
    bottles = level1.bottles;

    bottleIsThrown = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();

        this.run();
        // this.checkCollisions();
        // this.checkCoins();
        // this.checkBottles();
        // this.checkThrowObjects();
        // this.throwBottle();
    }

    setWorld() {
        this.character.world = this;
        this.ThrowableObjects.world = this;
    }


    draw() {

        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0); // wenn nur (this.camera_x) dann wird nicht geladen, man  mus die y Achse auch nennen

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.ThrowableObjects);

        this.addToMap(this.character); //Forwards

        this.ctx.translate(-this.camera_x, 0); //Back

        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);

        this.ctx.translate(this.camera_x, 0);

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
          this.checkCollisions();
          this.checkCoins();
          this.checkBottles();
        //   this.checkCollisionsBottlesToBoss();
          this.checkThrowObjects();
        //   this.checkIfBossIsDead();
        //   this.checkCollisionsBoss();
        }, 50);
      }


    checkThrowObjects() {

            if (
                this.keyboard.B &&
                this.bottleIsThrown == false &&
                this.character.bottlesAmount > 0
            ) {
                this.character.bottlesAmount--;
                // this.statusBarBottle.setPercentage(this.character.bottles);
                this.statusBarBottle.setPercentageBottleBarAmount(
                    this.character.bottlesAmount
                );
                this.throwBottle();
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

        }, 1000);
    }



    checkCollisions() {

            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    // console.log('Collision with Character', enemy);
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    // console.log('Collision with Character, energy', this.character.energy)
                }
            })

    }


    checkCoins() {

            this.level.coins.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    const coinToRemove = this.level.coins.indexOf(coin);
                    this.level.coins.splice(coinToRemove, 1);
                    this.character.coinsAmount++;
                    this.statusBarCoins.setPercentage(this.character.coins);
                    this.statusBarCoins.setPercentageCoinBarAmount(
                        this.character.coinsAmount
                    );

                }
            })

    }

    checkBottles() {

            this.level.bottles.forEach((bottle) => {
                if (this.character.isColliding(bottle)) {
                    const bottleToRemove = this.level.bottles.indexOf(bottle);
                    this.level.bottles.splice(bottleToRemove, 1);
                    this.character.bottlesAmount++;
                    this.statusBarBottle.setPercentage(this.character.bottles);
                    this.statusBarBottle.setPercentageBottleBarAmount(
                        this.character.bottlesAmount
                    );
                    // console.log('du hast', this.character.bottlesAmount);
                }
            })

    }



}