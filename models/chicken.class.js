class Chicken extends MovableObject {
    height = 80;
    width = 65;
    y = 345;

    dead = false;
    intervalIds = [];

    CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    world;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_DEAD);
        this.x = 500 + Math.random() * 1000; 
        this.speed = 0.10 + Math.random() * 0.70; 
        this.animate();
    }

    animate() {
        this.chickenWalk();
        setInterval(() => {
            if (this.moveLeft) {
                this.playAnimation(this.CHICKEN_WALKING);
            } 
        }, 200);
    }

    chickenWalk() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    chickenIsDead() {
        this.speed = 0;
        setInterval(() => {
            this.playAnimation(this.CHICKEN_DEAD);
        })
    }

}