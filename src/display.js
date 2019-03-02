import Ship from "./ship";
import Asteroids from "./asteroids";
// import { Howl } from "howler";

class Display {
    constructor(canvasWidth, canvasHeight, ctx, gameSound, spaceShipSound, explosionSound, shootingSound) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = ctx;
        this.gameSound = gameSound;
        this.spaceShipSound = spaceShipSound;
        this.explosionSound = explosionSound;
        this.shootingSound = shootingSound;
        // this.shipExplodeDuration = 0.3; //Duration of the ship's explotation. 
        // this.shipExplodeInvDuration = 3; //Duration of the ship's invisibility in seconds. 
        // this.shipBlinkDuration = 0.1; //Duration of the ship's blink during invisibility in seconds. 
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
        this.background = new Image();
        this.background.src ="./imgs/gamebackground.jpg";
        this.exploting = false;
        this.exploat = 0;
        this.frame;
        // this.laserMax = 10; // Max number of lasers on the sceen at once. 
        // this.laserSpeed = 500; // Speed of laser in px per second.

        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("keyup", this.keyUp);
        this.renderItems({canwin: false});
        this.asteroids.createAsteroidsBelt();
    }
    
    startGame(){
        const begin = () => {
            this.frame = requestAnimationFrame(begin);
            // this.gameSound.play();
            document.getElementById("gameOver-modal").style.display = "none";
            document.getElementById("gameWon-modal").style.display = "none";
            this.renderItems({canwin:true});
        };
        begin();
    }

    endGame(){
        const end = () => {
            this.spaceShipSound.stop();
            window.cancelAnimationFrame(this.frame);
            document.getElementById("gameOver-modal").style.display = "block";
        };
        end();
    }

    wonGame(){
        const won = () => {
            this.spaceShipSound.stop();
            window.cancelAnimationFrame(this.frame);
            document.getElementById("gameWon-modal").style.display = "block";
        };
        won();
    }


    shootLaser() {
        // create the laser object
        if (this.ship.canShoot && this.ship.lasers.length < this.ship.laserMax) {
            this.shootingSound.play();
            this.ship.lasers.push({
                //from the nose of the ship
                x: this.ship.x + 4 / 3 * this.ship.radius * Math.cos(this.ship.angle),
                y: this.ship.y - 4 / 3 * this.ship.radius * Math.sin(this.ship.angle),
                xv: this.ship.laserSpeed * Math.cos(this.ship.angle) / this.FPS,
                yv: -this.ship.laserSpeed * Math.sin(this.ship.angle) / this.FPS,
                distance: 0
            });
        }
    }
    
    keyDown(event) {
        switch (event.keyCode) {
            case 32: //spacebar down = shoot the laser
                // console.log("spacebar up");
                this.shootLaser();
                break;
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
            case 32: //spacebar up = allow shooting again.
                // console.log("spacebar up");
                this.ship.canShoot = true;
                break;
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
        // console.log(this.exploat === 65);
        // console.log("Exploded");
        if (this.exploat === 65) {
            // console.log(this.ship.x, this.ship.y);
            // this.wonGame();
            // return;
            // this.cancelAnimationFrame(this.frame);
        }
    }
    

    

    // newShip() {
    //     return this.ship.drawShip();
    // }


    renderItems({canwin}) {
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
            // console.log("NLINK ON:", this.ship.blinkNum);
            //    if (blinkOn) {
            this.ship.drawShip();
            //    }

            // handle blinking 
            // if (this.ship.blinkNum > 0) {
            //     // reduce the blink time
            //     this.ship.blinkTime--;

            //     //reduce the blink num
            //     if (this.ship.blinkTime == 0) {
            //         this.ship.blinkTime = Math.ceil(this.ship.shipBlinkDuration * this.FPS);
                    // this.ship.blinkNum--;
            //     }
            // }
            
        } else {
            // draw the explotion
            this.ship.drawExplotion();
            this.endGame();
            // this.exploting = false;
        }


        // thrust the ship
        if (!this.exploting) {
            if (this.ship.thrusting) {
                this.spaceShipSound.play();
                this.ship.thrust.x += this.ship.shipThrust * Math.cos(this.ship.angle) / this.FPS;
                this.ship.thrust.y -= this.ship.shipThrust * Math.sin(this.ship.angle) / this.FPS;
                // if (!this.exploting){
                    this.ship.drawThrust();
                // }
    
            } else {
                // this.spaceShipSound.stop();
                this.ship.thrust.x -= this.friction * this.ship.thrust.x / this.FPS;
                this.ship.thrust.y -= this.friction * this.ship.thrust.y / this.FPS;
            }
        }


        // centre dot for the ship
        this.ctx.fillStyle = "red";
        // console.log("this.ship.x @ display", this.ship.x);
        this.ctx.fillRect(this.ship.x - 1, this.ship.y - 1, 2, 2);

       

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
        } 
        // else {
        //     // this.ship.explodeTime--;
        //     if (this.ship.explodeTime == 0) {
        //         this.exploting = false;
        //         // this.newShip();
        //         // this.ship.drawShip();
        //     } 
        // }
     // }


        // if (!this.exploting) {
        //     //rotate ship
        //     this.ship.angle += this.ship.rotation;

        //     //move the ship
        
        //     this.ship.x += this.ship.thrust.x;
        //     this.ship.y += this.ship.thrust.y;
        // }
   
        //Draw the lasers 
        for (let i = 0; i < this.ship.lasers.length; i++) {
            this.ctx.fillStyle = "salmon";
            this.ctx.beginPath();
            this.ctx.arc(this.ship.lasers[i].x, this.ship.lasers[i].y, this.ship.shipSize / 15, 0, Math.PI * 2, false);
            this.ctx.fill();
        }

        //Detect when the laser hits on asteroids 
        let asteroidX, asteroidY, asteroidR, laserX, laserY;
        for (let i = this.asteroids.roids.length - 1; i >= 0; i--){
            //Grab the asteroids properties
            asteroidX = this.asteroids.roids[i].x;
            asteroidY = this.asteroids.roids[i].y;
            asteroidR = this.asteroids.roids[i].radius;

            //loop over the lasers 
            for (let j = this.ship.lasers.length - 1; j >= 0; j--){
                //grab the lasers properties 
                laserX = this.ship.lasers[j].x;
                laserY = this.ship.lasers[j].y;

                //detect the actual hits: 
                // if the distance between the asteroid and the laser is less than asteroid radius the it is considered a hit.
                if (this.asteroids.distBeteenPoints(asteroidX, asteroidY, laserX, laserY) < asteroidR){
                    this.explosionSound.play();
                    //remove the laser
                    this.ship.lasers.splice(j, 1);
                    //remove the asteroid
                    this.asteroids.roids.splice(i, 1);
                    break;
                }
            }
        }

        // Detect when game won
        if (this.asteroids.roids.length === 0 && canwin){
            // console.log("Won");
            this.wonGame();
        }

        // Move/logic lasers
        for (let i = this.ship.lasers.length - 1; i >= 0; i--) {
            // console.log(this.ship.lasers);

            //calculate the distance traveled
            this.ship.lasers[i].distance += Math.sqrt(Math.pow(this.ship.lasers[i].xv, 2) + Math.pow(this.ship.lasers[i].yv, 2));

            // check the distance travelled
            if (this.ship.lasers[i].distance > this.ship.laserDistance * this.canvasWidth) {
                this.ship.lasers.splice(i, 1);
                continue;
            }


            //moving the lasers 
            this.ship.lasers[i].x += this.ship.lasers[i].xv;
            this.ship.lasers[i].y += this.ship.lasers[i].yv;


            //Handling the lasers going off the edge of the canvas
            if (this.ship.lasers[i].x < 0) {
                this.ship.lasers[i].x = this.canvasWidth;
            } else if (this.ship.lasers[i].x > this.canvasWidth) {
                this.ship.lasers[i].x = 0;
            }
            if (this.ship.lasers[i].y < 0) {
                this.ship.lasers[i].y = this.canvasHeight;
            } else if (this.ship.lasers[i].y > this.canvasHeight) {
                this.ship.lasers[i].y = 0;
            }
        }

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
        
    }
}

export default Display;