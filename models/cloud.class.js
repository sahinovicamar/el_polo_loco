class Cloud extends MovableObject {
    y = 20;
    width = 600;
    height = 300;
    speed = 0.03;

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/2.png');
        // this.loadImages('../img/5_background/layers/4_clouds/2.png');
        this.x = 1300 + Math.random() * 500;
        this.animate();
    
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }), 1000 / 60
    }


}