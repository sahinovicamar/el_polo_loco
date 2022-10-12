class Endboss extends MovableObject {

    height = 420;
    width = 270;
    y = 40;
    x = 2550;

    endBossHealth = 5;
    endBossDead = false;
    energy = 100;


    imagesWalkingEndboss = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    imagesAlertEndboss = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    imagesAttackEndboss = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    imagesHurtEndboss = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    imagesDeadEndboss = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    world;
    offset = {
        top: 60,
        bottom: 40,
        left: 30,
        right: 50
    }
    speed = 0.05;


    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.imagesWalkingEndboss);
        this.loadImages(this.imagesAlertEndboss);
        this.loadImages(this.imagesAttackEndboss);
        this.loadImages(this.imagesHurtEndboss);
        this.loadImages(this.imagesDeadEndboss);
        this.animate();
    }

    animate() {
        this.endBossRunLeft();
        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.imagesDeadEndboss)
                this.speed = 0;
            } else if (this.isHurt()) {
                this.playAnimation(this.imagesHurtEndboss)
            } else {
                this.playAnimation(this.imagesWalkingEndboss);
            }

        }, 200);
    }

    endBossRunLeft() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

    }

    stopIntervalsEndboss() {
        if(this.energy <= 0){
            clearInterval(this.animate)
        }
        // this.loadImage('img/4_enemie_boss_chicken/5_dead/G26.png')
    }

}


