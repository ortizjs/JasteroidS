class Asteroids {
    constructor(canvasWidth, canvasHeight, asteroidsNum, FPS) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.asteroidsNum = asteroidsNum;
        this.FPS = FPS;
        this.asteroidSize = 100; // Starting size of asteroids in px
        this.asteroidSpeed = 50; // Max starting speed of asteroids in pixels per second
        this.x;
        this.y;
        // this.createAsteroids = this.createAsteroids.bind(this);
        // this.newAsteroid = this.newAsteroid.bind(this);
    }

    createAsteroids() {
        asteroids = [];
        this.x = Math.floor(Math.random() * this.canvasWidth);
        this.y = Math.floor(Math.random() * this.canvasHeight);
        for (let i = 0; i < this.asteroidsNum; i++) {
            asteroids.push(newAsteroid(this.x, this.y));
        }
    }

    newAsteroid(x, y) {
        asteroid = {
            x: this.x,
            y: this.y,
            xValocity: Math.random() * this.asteroidSpeed / this.FPS * (Math.random() < 0.5 ? 1 : -1),
            yValocity: Math.random() * this.asteroidSpeed / this.FPS * (Math.random() < 0.5 ? 1 : -1),
            radius: this.asteroidSize / 2,
            angle: Math.random() * Math.PI * 2 // in radians
        };
        return asteroid;
    }
}

export default Asteroids;