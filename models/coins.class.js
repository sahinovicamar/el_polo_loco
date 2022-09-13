class Coins extends MovableObject {

    // height = 150;
    // width = 150;
    // y = 280;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'

    ];

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = 300 + Math.random() * 600;
        this.y = 300;
        this.width = 150;
        this.height = 150;
        this.animate();
    }

    animate() {
         
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 500)

    } 

}