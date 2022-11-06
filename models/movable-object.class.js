class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    energyEndBoss = 10;
    lastHit = 0;



    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 40);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // ThrowableObject should always fall
            return true;
        } else {
            return this.y < 125;
        }
    }



    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
    
    // isColliding(mo) {
    //     return this.x + this.width - this.offsetBlue.right > mo.x + mo.offsetBlue.left &&
    //         this.y + this.height - this.offsetBlue.bottom > mo.y + mo.offsetBlue.top &&
    //         this.x + this.offsetBlue.left < mo.x + mo.width - mo.offsetBlue.right &&
    //         this.y + this.offsetBlue.top < mo.y + mo.height - mo.offsetBlue.bottom || 
    //         this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
    //         this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
    //         this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
    //         this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;;
    // }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    

    hitEndboss() {
        this.energyEndBoss -= 2;
        if (this.energyEndBoss < 0) {
            this.energyEndBoss = 0
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    oneTouchHit() {
        this.energy = 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // % bedeutet let i = 0 % 6; => 0, Rest 0 
        // i = 0, 1, 2, 3, 4, 5, 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

}