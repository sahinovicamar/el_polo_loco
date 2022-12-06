class Character extends MovableObject {

    height = 300;
    width = 145;
    y = 20;
    speed = 10;
    coinsAmount = 0;
    bottlesAmount = 0;

    intervalIds = [];


    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-31.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'

    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    world;

    offset = {
        top: 140,
        bottom: 14,
        left: 50,
        right: 50,
    };

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }
    

    animate() {

        setInterval(() => {
            walkingSound.pause();
            this.setKeyboardMoveRight();
            this.setKeyboardMoveLeft();
            this.setKeyboardJump();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        setInterval(() => {
            this.loadAllImages();
        }, 150)
    }


    setKeyboardMoveRight() {
        if ((this.world.keyboard.RIGHT || this.world.keyboard.D) && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            walkingSound.play();
        }
    }


    setKeyboardMoveLeft() {
        if ((this.world.keyboard.LEFT || this.world.keyboard.A) && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            walkingSound.play();
        }
    }


    setKeyboardJump() {
        if ((this.world.keyboard.UP || this.world.keyboard.W) && !this.isAboveGround()) { 
            this.jump();
            jumpSound.play();
        }
    }


    loadAllImages() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if ((this.world.keyboard.RIGHT || this.world.keyboard.D) || (this.world.keyboard.LEFT || this.world.keyboard.A)) {
            this.playAnimation(this.IMAGES_WALKING);
            this.y == 20;
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    jumpOnChicken(enemy) {
         return this.isColliding(enemy) && this.isAboveGround()
    }


    jump() {
        this.speedY = 17;
    }

    
    stopIntervalsCharacter() {
        if(this.energy <= 0){
            clearInterval(this.animate)
        }
    }
}