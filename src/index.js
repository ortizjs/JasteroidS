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
    document.querySelector("button").addEventListener("click", () => {
        game.startGame();
    }) ;
});