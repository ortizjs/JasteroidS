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

    // document.querySelector("button").addEventListener("click", () => {
    //     game.startGame();
    //     // gameSound.play();
    //     // spaceShipSound.play();
    // });

    // let background = new Image();
    // background.src = "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/BhBjRHe1Mj9qufshq/videoblocks-video-4k-animation-shinny-blue-stars-slowly-movement-in-black-galaxy-space-background-at-night_rlkmgjykg_thumbnail-full01.png";
    // // background.src = "./images/dark-sky.jpg";
    // this.ctx.drawImage(background, 0, 0, canv.width, canv.height);



    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("start")){
            game = new Display(canvasWidth, canvasHeight, ctx, spaceShipSound);
            game.startGame();
            // gameSound.play();
            // spaceShipSound.play();

        }
    });


});

/// python -m SimpleHTTPServer   <------- run server for audio
/// localhost: 8000