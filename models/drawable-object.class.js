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

    // loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src="">
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coins) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
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

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;

        });

    }

}