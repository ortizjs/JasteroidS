
class Ship {
    constructor (canvasHeight, canvasWidth, ctx) {
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.shipSize = 30; // ship height in px
        this.ctx = ctx;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.radius = this.shipSize / 2;
        this.angle = 90 / 180 * Math.PI; // to convert to radians 
        this.rotation = 0;
        this.thrusting = false;
        this.shipThrust = 5; //acceleration of the ship in pixels per second per second
        this.turnSpeed = 150; //Turn speed in degrees per second (check 360 if need to)
        this.thrustX = 0;        
        this.thrustY = 0;    
        // this.explodeTime = 0; 
        // this.shipExplodeDuration = 0.3; //Duration of the ship explosion

        this.thrust = {
            x: 0,
            y: 0
        };
    }

    drawShip() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = this.shipSize / 20;
        this.ctx.moveTo( //nose of the rectangular ship
            this.x + 4 / 3 * this.radius * Math.cos(this.angle),
            this.y - 4 / 3 * this.radius * Math.sin(this.angle)
        );

        this.ctx.lineTo( //rear left of the ship
            this.x - this.radius * (2 / 3 * Math.cos(this.angle) + Math.sin(this.angle)),
            this.y + this.radius * (2 / 3 * Math.sin(this.angle) - Math.cos(this.angle))
        );

        this.ctx.lineTo( //rear right of the ship
            this.x - this.radius * (2 / 3 * Math.cos(this.angle) - Math.sin(this.angle)),
            this.y + this.radius * (2 / 3 * Math.sin(this.angle) + Math.cos(this.angle))
        );

        this.ctx.closePath();
        this.ctx.stroke();
    } 

    drawBouding() {
        this.ctx.strokeStyle = "lime";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.stroke();
    }

    drawExplotion() {
        this.ctx.fillStyle = "darkred";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius * 1.7, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius * 1.4, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.fillStyle = "orange";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius * 1.1, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.fillStyle = "yello";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2, false);
        this.ctx.fill();
    }

    drawThrust() {
        //Draw the thruster

        this.ctx.beginPath();
        this.ctx.fillStyle = "red";
        this.ctx.strokeStyle = "yellow";
        this.ctx.lineWidth = this.shipSize / 10;
        this.ctx.moveTo( //rear left
            this.x - this.radius * (2 / 3 * Math.cos(this.angle) + 0.5 * Math.sin(this.angle)),
            this.y + this.radius * (2 / 3 * Math.sin(this.angle) - 0.5 * Math.cos(this.angle))
        );

        this.ctx.lineTo( //rear center (behind the ship)
            this.x - this.radius * 6 / 3 * Math.cos(this.angle),
            this.y + this.radius * 6 / 3 * Math.sin(this.angle)
        );

        this.ctx.lineTo( //rear right 
            this.x - this.radius * (2 / 3 * Math.cos(this.angle) - 0.5 * Math.sin(this.angle)),
            this.y + this.radius * (2 / 3 * Math.sin(this.angle) + 0.5 * Math.cos(this.angle))
        );

        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    // explodeShip() {
    //     this.explodeTime = Math.ceil(this.shipExplodeDuration * this.FPS);
    //     console.log(this.explodeTime);
    //     // this.drawExplotion();
    //     // this.ctx.fillStyle = "lime";
    //     // this.ctx.strokeStyle = "lime";
    //     // this.ctx.beginPath();
    //     // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    //     // this.ctx.fill();
    //     // this.ctx.stroke();
    // }
}

export default Ship;