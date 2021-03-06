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
        src: ["/src/airplane+hellfire.mp3"]
    });
    var explosionSound = new Howl({
        src: ["/src/Explosion+5.mp3"]
    });
    var shootingSound = new Howl({
        src: ["/src/Gun+Luger.mp3"]
    });

    let game;
    let gameRestart = new Display(canvasWidth, canvasHeight, ctx, gameSound, spaceShipSound, explosionSound, shootingSound);



    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("start")){
            game = new Display(canvasWidth, canvasHeight, ctx, gameSound, spaceShipSound, explosionSound, shootingSound);
            game.startGame();
            document.querySelector("#game-canvas").focus();
        }
    });


});

/// python -m SimpleHTTPServer   <------- run server for audio
/// localhost: 8000