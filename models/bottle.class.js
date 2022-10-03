class Bottles extends MovableObject {
    IMAGES_BOTTLE = [
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];

    offset = {
        top: 20,
        bottom: 20,
        left: 35,
        right: 35
    }

    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 400 + Math.floor(Math.random() * 10 * 180);
        this.y = 100 + Math.floor(Math.random() * 10 * 25);
        // this.x = 300 + Math.random() * 600;
        this.y = 335;
        this.width = 90;
        this.height = 90;
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 500)

    }

}