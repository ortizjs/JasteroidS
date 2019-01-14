class Asteroids {
    constructor(canvasWidth, canvasHeight, FPS, ctx, shipSize, ship) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.FPS = FPS;
        this.roidSize = 100; // Starting size of asteroids in px
        this.roidSpeed = 50; // Max starting speed of asteroids in pixels per second
        this.ctx = ctx;
        this.shipSize = shipSize;
        this.ship = ship;
        this.x;
        this.y;
        this.roidsNum = 3; // starting number of asteroids 
        // this.asteroidSize.ctx = ctx;
        this.roids = [];
        this.roidsVertex = 10; // average number of vertices on each asteroid
        // this.createAsteroidsBelt = this.createAsteroidsBelt.bind(this);
        // this.newAsteroid = this.newAsteroid.bind(this);
    }

    drawAsteroids() {
        let x,y,radius, angle, vert;
        this.ctx.strokeStyle = "slategrey";
        this.ctx.lineWidth = this.shipSize / 20;
        for (let i = 0; i < this.roids.length; i++) {
            // get the asteroids properties 
            x = this.roids[i].x;
            y = this.roids[i].y;
            radius = this.roids[i].radius;
            angle = this.roids[i].angle;
            vert = this.roids[i].vert;

            //draw a path
            this.ctx.beginPath();
            this.ctx.moveTo(
                x + radius * Math.cos(angle),
                y + radius * Math.sin(angle)
            );
            // draw the polygon 
            for (let j = 0; j < vert; j++) {
                this.ctx.lineTo(
                    x + radius * Math.cos(angle + j * Math.PI * 2 / vert),
                    y + radius * Math.sin(angle + j * Math.PI * 2 / vert)
                );
            }
            this.ctx.closePath();
            this.ctx.stroke();

            //move the asteroid 
        }
    }

    createAsteroidsBelt() {
        this.roids = [];
        for (let i = 0; i < this.roidsNum; i++) {
            do {
                this.x = Math.floor(Math.random() * this.canvasWidth);
                this.y = Math.floor(Math.random() * this.canvasHeight);
                this.roids.push(this.newAsteroid(this.x, this.y));
            } while (this.distBeteenPoints(this.ship.x, this.ship.y, this.x, this.y) < this.roidSize * 2 + this.ship.radius);
        }
        console.log(this.roids);
    }

    distBeteenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    newAsteroid(x, y) {
        let roid = {
            x: x,
            y: y,
            xVelocity: Math.random() * this.roidSpeed / this.FPS * (Math.random() < 0.5 ? 1 : -1),
            yVelocity: Math.random() * this.roidSpeed / this.FPS * (Math.random() < 0.5 ? 1 : -1),
            radius: this.roidSize / 2,
            angle: Math.random() * Math.PI * 2, // in radians
            vert: Math.floor(Math.random() * (this.roidsVertex + 1) + this.roidsVertex / 2)
        };
        // console.log(roid);
        return roid;
    }
}

export default Asteroids;