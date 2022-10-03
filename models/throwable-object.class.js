class ThrowableObject extends MovableObject {

    throwableObjects = [];

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
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    }


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_BREAKING);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.throw();
        this.rotationBottle();
        // this.bottleBreak();
    }

    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
        }, 25);
    }

    rotationBottle() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATING);
        }, 100);
    }

    bottleBreak() {
        this.playAnimation(this.IMAGES_BREAKING);
        setTimeout(() => {
            this.x = 0;
        }, 100);
    }
}