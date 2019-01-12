import Ship from "./ship";
class Display {
    constructor(canvasWidth, canvasHeight, ctx){
        this.ship = new Ship();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = ctx;

    }
}

export default Display;