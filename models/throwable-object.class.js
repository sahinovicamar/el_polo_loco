class ThrowableObject extends MovableObject {
    intervalIds = [];

    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'

    ];

    IMAGES_BREAKING = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    world;

    offset = {
        top: 20,
        bottom: 20,
        left: 35,
        right: 35
    }

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_BREAKING);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.speed = 15;
        this.speedY = 10;
        this.throw();
    }

    throw() {
        this.applyGravity();
        setInterval(() => {
            this.bottleDirection();
        }, 25);
        this.checkThrowableObject();
    }

    bottleDirection() {
        if (world.character.otherDirection) {
            this.moveLeft();
        } else {
            this.moveRight()
        }
    }

    checkThrowableObject() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_ROTATING);
            }
            this.breakBottle();
        }, 50)
    }

    breakBottle() {
        if (this.y > 310) {
            this.playAnimation(this.IMAGES_BREAKING);
        }
    }

}