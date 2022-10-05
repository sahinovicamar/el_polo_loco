class Chicken extends MovableObject {

    height = 80;
    width = 65;
    y = 360;
    CHICKEN_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.CHICKEN_WALKING);

        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700 random Posi
        this.speed = 0.15 + Math.random() * 0.35; // hier wird eine unterschiedliche Geschwindikeit von Hühner gesetzt

        this.animate();
    
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
         
        setInterval(() => {
            this.playAnimation(this.CHICKEN_WALKING);
        }, 200)

    }

}