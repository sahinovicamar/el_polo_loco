class Chicken extends MovableObject {

    height = 80;
    width = 65;
    y = 360;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700 random
        this.speed = 0.15 + Math.random() * 0.35; // hier wird eine unterschiedliche Geschwindikeit von Hühner gesetzt

        this.animate();
    
    }

    animate() {
        this.moveLeft();
         
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // % bedeutet let i = 0 % 6; => 0, Rest 0 
            // i = 0, 1, 2, 3, 4, 5, 0
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 300)

    }

}