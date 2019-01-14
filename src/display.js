import Ship from "./ship";
import Asteroids from "./asteroids";

class Display {
    constructor(canvasWidth, canvasHeight, ctx){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = ctx;
        this.ship = new Ship(canvasWidth, canvasHeight, ctx);
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.FPS = 30;  // frames per seconds
        this.friction = 0.7; //friction of spaceship (0 - 1)
        this.asteroids = new Asteroids(canvasWidth, canvasHeight, this.FPS, ctx, this.ship.shipSize, this.ship);
        this.showBouding = true;



        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("keyup", this.keyUp);
        this.renderItems();
        this.asteroids.createAsteroidsBelt();
    }
    
    startGame(){
        const begin = () => {
            this.frame = requestAnimationFrame(begin);
            this.renderItems();
            // this.asteroids.createAsteroidsBelt();
            this.asteroids.moveAsteroids();
        };
        begin();
    }


    keyDown(event) {
        switch (event.keyCode) {
            case 37: // left arrow down = rotation ship left
                this.ship.rotation = this.ship.turnSpeed / 180 * Math.PI / this.FPS;
                break;
            case 38: // up arrow down = thrust the ship forward
                this.ship.thrusting = true;
                break;
            case 39: //right arrow down = rotation ship right
                this.ship.rotation = - this.ship.turnSpeed / 180 * Math.PI / this.FPS;
                break;
        }
    }

    keyUp(event) {
        switch (event.keyCode) {
            case 37: // left arrow up = stop rotating ship left
                this.ship.rotation = 0;
                break;
            case 38: // up arrow up = stop thrusting
                this.ship.thrusting = false;
                break;
            case 39: //right arrow up = stop rotating ship right
                this.ship.rotation = 0;
                break;
        }
    }

    
    renderItems() {
        //create background/canvas
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        //draw the player ship
        this.ship.drawShip();

        //Collision boudning
        if (this.showBouding) {
            this.ship.drawBouding();

        }


        //draw the asteroids 
        this.asteroids.drawAsteroids();
        // this.asteroids.createAsteroidsBelt();
        

        //Move the asteroids....
        
        
        // thrust the ship
        if (this.ship.thrusting) {
            this.ship.thrust.x += this.ship.shipThrust * Math.cos(this.ship.angle) / this.FPS;
            this.ship.thrust.y -= this.ship.shipThrust * Math.sin(this.ship.angle) / this.FPS;
            this.ship.drawThrust();

        } else {
            this.ship.thrust.x -= this.friction * this.ship.thrust.x / this.FPS;
            this.ship.thrust.y -= this.friction * this.ship.thrust.y / this.FPS;
        }

        //rotate ship
        this.ship.angle += this.ship.rotation;

        //move the ship
        this.ship.x += this.ship.thrust.x;
        this.ship.y += this.ship.thrust.y;

        // centre dot 
        this.ctx.fillStyle = "red";
        // console.log("this.ship.x @ display", this.ship.x);
        this.ctx.fillRect(this.ship.x - 1, this.ship.y - 1, 2, 2);

        //handle edge of screen
        if (this.ship.x < 0 - this.ship.radius) {
            this.ship.x = this.canvasWidth + this.ship.radius;
        } else if (this.ship.x > this.canvasWidth + this.ship.radius) {
            this.ship.x = 0 - this.ship.radius;
        }
        if (this.ship.y < 0 - this.ship.radius) {
            this.ship.y = this.canvasHeight + this.ship.radius;
        } else if (this.ship.y > this.canvasHeight + this.ship.radius) {
            this.ship.y = 0 - this.ship.radius;
        }
    }
}

export default Display;