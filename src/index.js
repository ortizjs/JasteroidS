import Display from "./display";
import { Howl } from "howler";


document.addEventListener("DOMContentLoaded", () => {
    var canv = document.getElementById('game-canvas');
    let canvasWidth = canv.width; 
    let canvasHeight = canv.height; 
    let ctx = canv.getContext('2d'); 

    // var gameSound = new Howl({
    //     src: ["/src/background.mp3"],
    //     buffer: true,
    //     loop: true
    // });

    var spaceShipSound = new Howl({
        src: ["/src/spaceship_sound.mp3"]
    });

    // let game = new Display(canvasWidth, canvasHeight, ctx, spaceShipSound);
    let game;
    let gameRestart = new Display(canvasWidth, canvasHeight, ctx, spaceShipSound);



    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("start")){
            game = new Display(canvasWidth, canvasHeight, ctx, spaceShipSound);
            game.startGame();
            document.querySelector("#game-canvas").focus();
            // gameSound.play();
            // spaceShipSound.play();

        }
    });


});

/// python -m SimpleHTTPServer   <------- run server for audio
/// localhost: 8000