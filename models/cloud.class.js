class Cloud extends MovableObject {
    y = 20;
    width = 600;
    height = 300;

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/2.png')

        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700 random
        this.animate();
    
    }

    animate() {
        this.moveLeft();
    }


}