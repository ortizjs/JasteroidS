import Ship from "./ship";
import Asteroids from "./asteroids";
// import { Howl } from "howler";

class Display {
    constructor(canvasWidth, canvasHeight, ctx, spaceShipSound){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = ctx;
        this.spaceShipSound = spaceShipSound;
        // this.shipExplodeDuration = 0.3; //Duration of the ship's explotation. 
        // this.shipExplodeInvDuration = 3; //Duration of the ship's invisibility in seconds. 
        // this.shipBlinkDuration = 0.1; //Duration of the ship's blink during invisibility in seconds. 
        this.background = new Image();
        this.ship = new Ship(canvasWidth, canvasHeight, ctx);
        // this.ship = new Ship(canvasWidth, canvasHeight, ctx, this.shipBlinkDuration, this.FPS, this.shipExplodeInvDuration);
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.FPS = 30;  // frames per seconds
        this.friction = 0.95; //friction of spaceship (0 - 1)
        this.asteroids = new Asteroids(canvasWidth, canvasHeight, this.FPS, ctx, this.ship.shipSize, this.ship);
        this.showBouding = false;
        // this.shipExplodeTime = 0;
        // this.background.src ="";
        this.background.src ="../imgs/gamebackground.jpg";
        this.exploting = false;
        this.exploat = 0;
        this.frame;

        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("keyup", this.keyUp);
        this.renderItems();
        this.asteroids.createAsteroidsBelt();
    }
    
    startGame(){
        const begin = () => {
            this.frame = requestAnimationFrame(begin);
            document.getElementById("gameOver-modal").style.display = "none";
            this.renderItems();
        };
        begin();
    }

    endGame(){
        const end = () => {
            window.cancelAnimationFrame(end);
            document.getElementById("gameOver-modal").style.display = "block";
        };
        end();
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

    explodeShip() {
        this.ship.explodeTime = Math.ceil(this.shipExplodeDuration * this.FPS);
    //     this.exploting = this.shipExplodeTime > 0;
    // console.log(this.exploting, this.shipExplodeTime);
    
        // this.ship.drawExplotion();
        console.log(this.exploat === 65);
        console.log("Exploded");
        if (this.exploat === 65) {
            console.log(this.ship.x, this.ship.y);
            this.endGame();
            // return;
            // this.cancelAnimationFrame(this.frame);
        }
    }

    newShip() {
        return this.ship.drawShip();
    }


    renderItems() {
        //Boolean for whether the ship is exploding.
        // let blinkOn = this.ship.blinkNum % 2 == 0;
        // let exploding = this.ship.explodeTime > 0;

        //create background/canvas

        this.ctx.drawImage(this.background, 0, 0);

        //Collision bounding
        if (this.showBouding) {
            this.ship.drawBouding();
        }

        //draw the player ship or explotion

        if (!this.exploting) {
            console.log("NLINK ON:", this.ship.blinkNum);
        //     if (blinkOn) {
                this.ship.drawShip();
        //     }

            // handle blinking 
            if (this.ship.blinkNum > 0) {
            //     // reduce the blink time
            //     this.ship.blinkTime--;

            //     //reduce the blink num
            //     if (this.ship.blinkTime == 0) {
            //         this.ship.blinkTime = Math.ceil(this.ship.shipBlinkDuration * this.FPS);
                    this.ship.blinkNum--;
            //     }
            // }
            
        } else {
            // draw the explotion
            this.ship.drawExplotion();
            this.endGame();
            // this.exploting = false;
            // setTimeout(this.alertAndReload(), 2000);
            // setTimeout(document.getElementById(""));
        }


        // thrust the ship
        if (this.ship.thrusting) {
            this.spaceShipSound.play();
            this.ship.thrust.x += this.ship.shipThrust * Math.cos(this.ship.angle) / this.FPS;
            this.ship.thrust.y -= this.ship.shipThrust * Math.sin(this.ship.angle) / this.FPS;
            if (!this.exploting){
                this.ship.drawThrust();
            }

        } else {
            this.ship.thrust.x -= this.friction * this.ship.thrust.x / this.FPS;
            this.ship.thrust.y -= this.friction * this.ship.thrust.y / this.FPS;
        }

        //check asteroid collision
        if (!this.exploting) {
            for (let i = 0; i < this.asteroids.roids.length; i++) {
                if (this.asteroids.distBeteenPoints(this.ship.x, this.ship.y, this.asteroids.roids[i].x,
                    this.asteroids.roids[i].y) < this.ship.radius + this.asteroids.roids[i].radius) {
                    this.exploting = true;
                    this.exploat = 65;
                    this.explodeShip();
                    // this.endGame();
                    // this.ship.drawShip();
                }
            }
            //rotate ship
            this.ship.angle += this.ship.rotation;

            //move the ship

            this.ship.x += this.ship.thrust.x;
            this.ship.y += this.ship.thrust.y;
        } else {
            // this.ship.explodeTime--;
            if (this.ship.explodeTime == 0) {
                this.exploting = false;
                // this.newShip();
                this.ship.drawShip();
            } 
        }


        // if (!this.exploting) {
        //     //rotate ship
        //     this.ship.angle += this.ship.rotation;

        //     //move the ship
        
        //     this.ship.x += this.ship.thrust.x;
        //     this.ship.y += this.ship.thrust.y;
        // }



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

        //draw the asteroids 
        this.asteroids.drawAsteroids();        

        //Move the asteroids....
        if (!this.exploting) {
            for (let i = 0; i < this.asteroids.roids.length; i++) {

                this.asteroids.roids[i].x += this.asteroids.roids[i].xVelocity;
                this.asteroids.roids[i].y += this.asteroids.roids[i].yVelocity;
            }
        }

        //handle the edges of the screen
        for (let i = 0; i < this.asteroids.roids.length; i++) {
            if (this.asteroids.roids[i].x < 0 - this.asteroids.roids[i].radius) {
                this.asteroids.roids[i].x = this.canvasWidth + this.asteroids.roids[i].radius;
            } else if (this.asteroids.roids[i].x > this.canvasWidth + this.asteroids.roids[i].radius) {
                this.asteroids.roids[i].x = 0 - this.asteroids.roids[i].radius;
            }

            if (this.asteroids.roids[i].y < 0 - this.asteroids.roids[i].radius) {
                this.asteroids.roids[i].y = this.canvasWidth + this.asteroids.roids[i].radius;
            } else if (this.asteroids.roids[i].y > this.canvasWidth + this.asteroids.roids[i].radius) {
                this.asteroids.roids[i].y = 0 - this.asteroids.roids[i].radius;
            }
        }

        // //check asteroid collision
        // if (!this.exploting) {
        //     for (let i = 0; i < this.asteroids.roids.length; i++) {
        //         if (this.asteroids.distBeteenPoints(this.ship.x, this.ship.y, this.asteroids.roids[i].x, 
        //             this.asteroids.roids[i].y) < this.ship.radius + this.asteroids.roids[i].radius) {
        //                 this.exploting = true;
        //                 this.exploat = 65;
        //                 this.explodeShip();

        //                 // this.endGame();

        //                 // this.ship.drawShip();
        //         }
        //     }
        
    }
}

export default Display;