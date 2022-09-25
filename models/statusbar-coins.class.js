class StatusBarCoins extends DrawableObject {
    IMAGES_COINSBAR = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png"
    ];

    maxCoinAmountBarValue = this.IMAGES_COINSBAR.length;
    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINSBAR);
        this.setPercentageCoinBarAmount(0);
        this.width = 200;
        this.height = 70;
        this.x = 50;
        this.y = 40;
    }

    setPercentageCoinBarAmount(coinsCollected) {
        if (this.maxCoinAmountBarValueReached(coinsCollected)) {
            coinsCollected--;
        }
        let path = this.IMAGES_COINSBAR[coinsCollected];
        this.img = this.imageCache[path];
    }

    maxCoinAmountBarValueReached(coinsCollected) {
        return coinsCollected == this.maxCoinAmountBarValue;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}