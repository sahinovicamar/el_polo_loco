class StatusBarBottle extends DrawableObject {
    IMAGES_BOTTLEBAR = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png"

    ];

    maxBottleAmountBarValue = this.IMAGES_BOTTLEBAR.length;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.setPercentageBottleBarAmount(0);
        this.width = 200;
        this.height = 70;
        this.x = 50;
        this.y = 90;
    }

    setPercentageBottleBarAmount(bottleCollected) {
        if (this.maxBottleAmountBarValueReached(bottleCollected)) {
            bottleCollected--;
        }
        let path = this.IMAGES_BOTTLEBAR[bottleCollected];
        this.img = this.imageCache[path];
    }

    maxBottleAmountBarValueReached(bottleCollected) {
        return bottleCollected == this.maxBottleAmountBarValue;
    }
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndex()];
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