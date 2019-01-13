import Ship from "./ship";
class Display {
    constructor(canvasWidth, canvasHeight, ctx){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = ctx;
        this.ship = new Ship(canvasWidth, canvasHeight, ctx);
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.FPS = 30;
        this.friction = 0.7;

        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("keyup", this.keyUp);
        this.renderItems();

    }

    startGame(){
        const begin = () => {
            this.frame = requestAnimationFrame(begin);
            this.renderItems();
        };
        begin();
    }


    keyDown(event) {
        switch (event.keyCode) {
            case 37: // left arrow down = rotation ship left
                this.ship.rotation = this.turnSpeed / 180 * Math.PI / this.FPS;
                break;
            case 38: // up arrow down = thrust the ship forward
                this.ship.thrusting = true;
                break;
            case 39: //right arrow down = rotation ship right
                this.ship.rotation = - this.turnSpeed / 180 * Math.PI / this.FPS;
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
        
        // thrust the ship
        if (this.ship.thrusting) {
            this.ship.thrust.x += this.shipThrust * Math.cos(this.ship.angle) / this.FPS;
            this.ship.thrust.y -= this.shipThrust * Math.sin(this.ship.angle) / this.FPS;


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
        this.ctx.fillRect(this.ship.x - 1, this.ship.y - 1, 2, 2);
    }
}

export default Display;