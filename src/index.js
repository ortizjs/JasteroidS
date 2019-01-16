// import _ from 'lodash';

// const Game = require("./game");
// const GameView = require("./game_view");
// const MovingObject = require("./moving_object.js");

import Display from "./display";
import { Howl } from "howler";


document.addEventListener("DOMContentLoaded", () => {
    var canv = document.getElementById('game-canvas');
    let canvasWidth = canv.width; 
    let canvasHeight = canv.height; 
    let ctx = canv.getContext('2d'); 
    var gameSound = new Howl({
        src: ["/src/background.mp3"],
        buffer: true,
        loop: true
    });

    var spaceShipSound = new Howl({
        src: ["/src/spaceship_sound.mp3"],
        // buffer: true,
        // loop: true
    });

    let game = new Display(canvasWidth, canvasHeight, ctx, spaceShipSound);
    document.querySelector("button").addEventListener("click", () => {
        game.startGame();
        gameSound.play();
        // spaceShipSound.play();
    });
});

/// python -m SimpleHTTPServer   <------- run server for audio
/// localhost: 8000