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
        this.roidsNum = 10; // starting number of asteroids 
        this.roids = [];
        this.roidsVertex = 10; // average number of vertices on each asteroid
        this.roidJag = 0.4; //jaggerness of the asteroids (0 = none, 1 = lots)
        this.showBouding = false; // Shows/hide the collision boudning of each element in development mode.
        // this.createAsteroidsBelt = this.createAsteroidsBelt.bind(this);
        // this.newAsteroid = this.newAsteroid.bind(this);
    }

    drawAsteroids() {
        let x,y,radius, angle, vert, offs;
        for (let i = 0; i < this.roids.length; i++) {
            this.ctx.strokeStyle = "slategrey";
            this.ctx.lineWidth = this.shipSize / 20;
            // get the asteroids properties 
            x = this.roids[i].x;
            y = this.roids[i].y;
            radius = this.roids[i].radius;
            angle = this.roids[i].angle;
            vert = this.roids[i].vert;
            offs = this.roids[i].offs; 

            //draw a path
            this.ctx.beginPath();
            this.ctx.moveTo(
                x + radius * offs[0] * Math.cos(angle),
                y + radius * offs[0] * Math.sin(angle)
            );
            // draw the polygon 
            for (let j = 1 ; j < vert; j++) {
                this.ctx.lineTo(
                    x + radius * offs[j] * Math.cos(angle + j * Math.PI * 2 / vert),
                    y + radius * offs[j] * Math.sin(angle + j * Math.PI * 2 / vert)
                );
            }
            this.ctx.closePath();
            this.ctx.stroke();


            //Draw collision circles
            if (this.showBouding) {
                this.ctx.strokeStyle = "lime";
                this.ctx.beginPath();
                this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
                this.ctx.stroke();
            }
        }

    }
    
    //move the asteroids
    // moveAsteroids() {
    //     let x, y, radius, angle, vert, offs;
    //     for (let i = 0; i < this.roids.length; i++) {
    //         //move the asteroid 

    //         this.roids[i].x += this.roids[i].xVelocity;
    //         this.roids[i].y += this.roids[i].yVelocity;

    //         //handle the edges of the screen

    //         if (this.roids[i].x < 0 - this.roids[i].radius) {
    //             this.roids[i].x = this.canvasWidth + this.roids[i].radius;
    //         } else if (this.roids[i].x > this.canvasWidth + this.roids[i].radius) {
    //             this.roids[i].x = 0 - this.roids[i].radius;
    //         }

    //         if (this.roids[i].y < 0 - this.roids[i].radius) {
    //             this.roids[i].y = this.canvasWidth + this.roids[i].radius;
    //         } else if (this.roids[i].y > this.canvasWidth + this.roids[i].radius) {
    //             this.roids[i].y = 0 - this.roids[i].radius;
    //         }

    //     }
    // }

    createAsteroidsBelt() {
        this.roids = [];
        for (let i = 0; i < this.roidsNum; i++) {
            do {
                this.x = Math.floor(Math.random() * this.canvasWidth);
                this.y = Math.floor(Math.random() * this.canvasHeight);
            } while (this.distBeteenPoints(this.ship.x, this.ship.y, this.x, this.y) < this.roidSize * 2 + this.ship.radius);
                this.roids.push(this.newAsteroid(this.x, this.y));
        }
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
            vert: Math.floor(Math.random() * (this.roidsVertex + 1) + this.roidsVertex / 2),
            offs: []
        };
        //create vertex offset array 
        for (let i = 0; i < roid.vert; i++) {
            roid.offs.push(Math.random() * this.roidJag * 2 + 1 - this.roidJag);
        }
        // console.log(roid);
        return roid;
    }

    
}

export default Asteroids;