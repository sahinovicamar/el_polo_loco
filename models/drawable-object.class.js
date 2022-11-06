class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 285;
    height = 150;
    width = 100;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;

        });

    }

    draw(ctx) {
        // ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            // console.warn('Image could not loaded', error);
            // console.log(this.img.src);
        }
    }


    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof Bottles || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }

    };



}