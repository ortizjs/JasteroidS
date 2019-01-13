// import _ from 'lodash';

// const Game = require("./game");
// const GameView = require("./game_view");
// const MovingObject = require("./moving_object.js");

import Display from "./display";
import Ship from "./ship";


document.addEventListener("DOMContentLoaded", () => {
    var canv = document.getElementById('game-canvas');
    let canvasWidth = canv.width; 
    let canvasHeight = canv.height; 
    let ctx = canv.getContext('2d'); 
    let game = new Display(canvasWidth, canvasHeight, ctx);
    game.startGame();


    const FPS = 30; // frames per seconds
    const shipSize = 30; // ship height in px
    const turnSpeed = 360; //Turn speed in degrees per second
    const shipThrust = 5; //acceleration of the ship in pixels per second per second
    const friction = 0.7; //friction of spaceship (0 - 1)
    
    

    // canvasEl.height = window.innerHeight;
    // canvasEl.width = window.innerWidth;
    // canvasEl.width = Game.DIM_X;
    // canvasEl.hight = Game.DIM_Y;
    // canvasEl.width = 400;
    // canvasEl.hight = 400;

    // var ctx = canvasEl.getContext('2d');
    // ctx.fillStyle = "black";


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

    // let ship = new Ship(canvasHeight, canvasWidth, ctx);
    // ship.drawShip();


    //Set up event handlers
    // document.addEventListener("keydown", keyDown);
    // document.addEventListener("keyup", keyUp);

    // function keyDown(event) {
    //     switch(event.keyCode) {
    //         case 37: // left arrow down = rotation ship left
    //             ship.rotation = turnSpeed / 180 * Math.PI / FPS; 
    //             break;
    //         case 38: // up arrow down = thrust the ship forward
    //             ship.thrusting = true;
    //             break;
    //         case 39: //right arrow down = rotation ship right
    //             ship.rotation = - turnSpeed / 180 * Math.PI / FPS; 
    //             break;
    //     }
            
    // }

    // function keyUp(event) {
    //     switch (event.keyCode) {
    //         case 37: // left arrow up = stop rotating ship left
    //             ship.rotation = 0;
    //             break;
    //         case 38: // up arrow up = stop thrusting
    //             ship.thrusting = false;
    //             break;
    //         case 39: //right arrow up = stop rotating ship right
    //             ship.rotation = 0;
    //             break;
    //     }
    // }

        // set up the game loop:
    // setInterval(update, 1000 / FPS);
    // function update () {
        // draw space 
        // ctx.fillStyle = "blue";
        // ctx.fillRect(0, 0, canv.width, canv.height);

        // draw the player ship
        // ship.drawShip();
        // thrust the ship
        // if (ship.thrusting) {
        //     ship.thrust.x += shipThrust * Math.cos(ship.angle) /  FPS;
        //     ship.thrust.y -= shipThrust * Math.sin(ship.angle) /  FPS;


        // } else {
        //     ship.thrust.x -= friction * ship.thrust.x / FPS;
        //     ship.thrust.y -= friction * ship.thrust.y / FPS;
        // }
        
        // draw the player ship
        // ctx.strokeStyle = "white",
        // ctx.lineWidth = shipSize / 15;
        // ctx.beginPath();

        // ctx.moveTo( //nose of the rectangular ship
        //     ship.x + 4/3 * ship.radious * Math.cos(ship.angle),
        //     ship.y - 4/3 * ship.radious * Math.sin(ship.angle)
        // );

        // ctx.lineTo( //rear left of the ship
        //     ship.x - ship.radious * (2/3 * Math.cos(ship.angle) + Math.sin(ship.angle)),
        //     ship.y + ship.radious * (2/3 * Math.sin(ship.angle) - Math.cos(ship.angle))
        // );

        // ctx.lineTo( //rear right of the ship
        //     ship.x - ship.radious * (2/3 * Math.cos(ship.angle) - Math.sin(ship.angle)),
        //     ship.y + ship.radious * (2/3 * Math.sin(ship.angle) + Math.cos(ship.angle))
        // );

        // ctx.closePath();
        // ctx.stroke(); 


        //rotate ship
        // ship.angle += ship.rotation;

        // //move the ship
        // ship.x += ship.thrust.x;
        // ship.y += ship.thrust.y
        
        ;

        //handle edge of screen
        // if (ship.x < 0 - ship.radious) {
        //     ship.x = canv.width + ship.radious;
        // } else if (ship.x > canv.width + ship.radious) {
        //     ship.x = 0 - ship.radious;
        // }
        // if (ship.y < 0 - ship.radious) {
        //     ship.y = canv.height + ship.radious;
        // } else if (ship.y > canv.height + ship.radious) {
        //     ship.y = 0 - ship.radious;
        // }


        //centre dot 
    //     ctx.fillStyle = "red";
    //     ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
    // }

});

// window.MovingObject = MovingObject;