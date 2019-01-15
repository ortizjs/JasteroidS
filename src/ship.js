
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

        this.thrust = {
            x: 0,
            y: 0
        };
    }

    // thurst(){
    //     this.x = 0;
    //     this.y = 0;
    // }

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
    // }
}

export default Ship;



// draw the player ship
// ctx.strokeStyle = "white",
//     ctx.lineWidth = shipSize / 15;
// ctx.beginPath();

// ctx.moveTo( //nose of the rectangular ship
//     ship.x + 4 / 3 * ship.radious * Math.cos(ship.angle),
//     ship.y - 4 / 3 * ship.radious * Math.sin(ship.angle)
// );

// ctx.lineTo( //rear left of the ship
//     ship.x - ship.radious * (2 / 3 * Math.cos(ship.angle) + Math.sin(ship.angle)),
//     ship.y + ship.radious * (2 / 3 * Math.sin(ship.angle) - Math.cos(ship.angle))
// );

// ctx.lineTo( //rear right of the ship
//     ship.x - ship.radious * (2 / 3 * Math.cos(ship.angle) - Math.sin(ship.angle)),
//     ship.y + ship.radious * (2 / 3 * Math.sin(ship.angle) + Math.cos(ship.angle))
// );

// ctx.closePath();
// ctx.stroke(); 



// var ship = {
//     x: canv.width / 2,
//     y: canv.height / 2,
//     radious: shipSize / 2,
//     angle: 90 / 180 * Math.PI, // to convert to radians 
//     rotation: 0,
//     thrusting: false,
//     thrust: {
//         x: 0,
//         y: 0
//     }
// };