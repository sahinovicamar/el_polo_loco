class Coins extends MovableObject {
    
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = 400 + Math.floor(Math.random() * 10 * 180);
        this.y = 100 + Math.floor(Math.random() * 60 * 2);
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