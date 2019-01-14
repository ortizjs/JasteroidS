/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroids.js":
/*!**************************!*\
  !*** ./src/asteroids.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Asteroids {\n    constructor(canvasWidth, canvasHeight, FPS, ctx, shipSize, ship) {\n        this.canvasWidth = canvasWidth;\n        this.canvasHeight = canvasHeight;\n        this.FPS = FPS;\n        this.roidSize = 100; // Starting size of asteroids in px\n        this.roidSpeed = 50; // Max starting speed of asteroids in pixels per second\n        this.ctx = ctx;\n        this.shipSize = shipSize;\n        this.ship = ship;\n        this.x;\n        this.y;\n        this.roidsNum = 10; // starting number of asteroids \n        this.roids = [];\n        this.roidsVertex = 10; // average number of vertices on each asteroid\n        this.roidJag = 0.4; //jaggerness of the asteroids (0 = none, 1 = lots)\n        this.showBouding = true; // Shows/hide the collision boudning of each element in development mode.\n        // this.createAsteroidsBelt = this.createAsteroidsBelt.bind(this);\n        // this.newAsteroid = this.newAsteroid.bind(this);\n    }\n\n    drawAsteroids() {\n        let x,y,radius, angle, vert, offs;\n        for (let i = 0; i < this.roids.length; i++) {\n            this.ctx.strokeStyle = \"slategrey\";\n            this.ctx.lineWidth = this.shipSize / 20;\n            // get the asteroids properties \n            x = this.roids[i].x;\n            y = this.roids[i].y;\n            radius = this.roids[i].radius;\n            angle = this.roids[i].angle;\n            vert = this.roids[i].vert;\n            offs = this.roids[i].offs; \n\n            //draw a path\n            this.ctx.beginPath();\n            this.ctx.moveTo(\n                x + radius * offs[0] * Math.cos(angle),\n                y + radius * offs[0] * Math.sin(angle)\n            );\n            // draw the polygon \n            for (let j = 1 ; j < vert; j++) {\n                this.ctx.lineTo(\n                    x + radius * offs[j] * Math.cos(angle + j * Math.PI * 2 / vert),\n                    y + radius * offs[j] * Math.sin(angle + j * Math.PI * 2 / vert)\n                );\n            }\n            this.ctx.closePath();\n            this.ctx.stroke();\n\n\n            //Draw collision circles\n            if (this.showBouding) {\n                this.ctx.strokeStyle = \"lime\";\n                this.ctx.beginPath();\n                this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);\n                this.ctx.stroke();\n            }\n        \n\n            // //move the asteroid \n\n            // this.roids[i].x += this.roids[i].xVelocity;\n            // this.roids[i].y += this.roids[i].yVelocity;\n\n            // //handle the edges of the screen\n\n            // if (this.roids[i].x < 0 - this.roids[i].radius) {\n            //     this.roids[i].x = this.canvasWidth + this.roids[i].radius;\n            // } else if (this.roids[i].x > this.canvasWidth + this.roids[i].radius) {\n            //     this.roids[i].x = 0 - this.roids[i].radius;\n            // }\n\n            // if (this.roids[i].y < 0 - this.roids[i].radius) {\n            //     this.roids[i].y = this.canvasWidth + this.roids[i].radius;\n            // } else if (this.roids[i].y > this.canvasWidth + this.roids[i].radius) {\n            //     this.roids[i].y = 0 - this.roids[i].radius;\n            // }\n        }\n\n    }\n    \n    //move the asteroids\n    moveAsteroids() {\n        let x, y, radius, angle, vert, offs;\n        for (let i = 0; i < this.roids.length; i++) {\n            //move the asteroid \n\n            this.roids[i].x += this.roids[i].xVelocity;\n            this.roids[i].y += this.roids[i].yVelocity;\n\n            //handle the edges of the screen\n\n            if (this.roids[i].x < 0 - this.roids[i].radius) {\n                this.roids[i].x = this.canvasWidth + this.roids[i].radius;\n            } else if (this.roids[i].x > this.canvasWidth + this.roids[i].radius) {\n                this.roids[i].x = 0 - this.roids[i].radius;\n            }\n\n            if (this.roids[i].y < 0 - this.roids[i].radius) {\n                this.roids[i].y = this.canvasWidth + this.roids[i].radius;\n            } else if (this.roids[i].y > this.canvasWidth + this.roids[i].radius) {\n                this.roids[i].y = 0 - this.roids[i].radius;\n            }\n\n        }\n    }\n\n    createAsteroidsBelt() {\n        this.roids = [];\n        for (let i = 0; i < this.roidsNum; i++) {\n            do {\n                this.x = Math.floor(Math.random() * this.canvasWidth);\n                this.y = Math.floor(Math.random() * this.canvasHeight);\n            } while (this.distBeteenPoints(this.ship.x, this.ship.y, this.x, this.y) < this.roidSize * 2 + this.ship.radius);\n                this.roids.push(this.newAsteroid(this.x, this.y));\n        }\n        // console.log(\n        //     \"this.ship.x: \", this.ship.x);\n        // console.log(\n        //     \"this.ship.y: \", this.ship.y);\n        // console.log(this.roids);\n    }\n\n    distBeteenPoints(x1, y1, x2, y2) {\n        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));\n    }\n\n    newAsteroid(x, y) {\n        let roid = {\n            x: x,\n            y: y,\n            xVelocity: Math.random() * this.roidSpeed / this.FPS * (Math.random() < 0.5 ? 1 : -1),\n            yVelocity: Math.random() * this.roidSpeed / this.FPS * (Math.random() < 0.5 ? 1 : -1),\n            radius: this.roidSize / 2,\n            angle: Math.random() * Math.PI * 2, // in radians\n            vert: Math.floor(Math.random() * (this.roidsVertex + 1) + this.roidsVertex / 2),\n            offs: []\n        };\n        //create vertex offset array \n        for (let i = 0; i < roid.vert; i++) {\n            roid.offs.push(Math.random() * this.roidJag * 2 + 1 - this.roidJag);\n        }\n        // console.log(roid);\n        return roid;\n    }\n\n    \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Asteroids);\n\n//# sourceURL=webpack:///./src/asteroids.js?");

/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _asteroids__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asteroids */ \"./src/asteroids.js\");\n\n\n\nclass Display {\n    constructor(canvasWidth, canvasHeight, ctx){\n        this.canvasWidth = canvasWidth;\n        this.canvasHeight = canvasHeight;\n        this.ctx = ctx;\n        this.ship = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvasWidth, canvasHeight, ctx);\n        this.keyDown = this.keyDown.bind(this);\n        this.keyUp = this.keyUp.bind(this);\n        this.FPS = 30;  // frames per seconds\n        this.friction = 0.7; //friction of spaceship (0 - 1)\n        this.asteroids = new _asteroids__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvasWidth, canvasHeight, this.FPS, ctx, this.ship.shipSize, this.ship);\n        this.showBouding = true;\n\n\n\n        document.addEventListener(\"keydown\", this.keyDown);\n        document.addEventListener(\"keyup\", this.keyUp);\n        this.renderItems();\n        this.asteroids.createAsteroidsBelt();\n    }\n    \n    startGame(){\n        const begin = () => {\n            this.frame = requestAnimationFrame(begin);\n            this.renderItems();\n            // this.asteroids.createAsteroidsBelt();\n            this.asteroids.moveAsteroids();\n        };\n        begin();\n    }\n\n\n    keyDown(event) {\n        switch (event.keyCode) {\n            case 37: // left arrow down = rotation ship left\n                this.ship.rotation = this.ship.turnSpeed / 180 * Math.PI / this.FPS;\n                break;\n            case 38: // up arrow down = thrust the ship forward\n                this.ship.thrusting = true;\n                break;\n            case 39: //right arrow down = rotation ship right\n                this.ship.rotation = - this.ship.turnSpeed / 180 * Math.PI / this.FPS;\n                break;\n        }\n    }\n\n    keyUp(event) {\n        switch (event.keyCode) {\n            case 37: // left arrow up = stop rotating ship left\n                this.ship.rotation = 0;\n                break;\n            case 38: // up arrow up = stop thrusting\n                this.ship.thrusting = false;\n                break;\n            case 39: //right arrow up = stop rotating ship right\n                this.ship.rotation = 0;\n                break;\n        }\n    }\n\n    \n    renderItems() {\n        //create background/canvas\n        this.ctx.fillStyle = \"black\";\n        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);\n\n        //draw the player ship\n        this.ship.drawShip();\n\n        //Collision boudning\n        if (this.showBouding) {\n            this.ship.drawBouding();\n\n        }\n\n\n        //draw the asteroids \n        this.asteroids.drawAsteroids();\n        // this.asteroids.createAsteroidsBelt();\n        \n\n        //Move the asteroids....\n        \n        \n        // thrust the ship\n        if (this.ship.thrusting) {\n            this.ship.thrust.x += this.ship.shipThrust * Math.cos(this.ship.angle) / this.FPS;\n            this.ship.thrust.y -= this.ship.shipThrust * Math.sin(this.ship.angle) / this.FPS;\n            this.ship.drawThrust();\n\n        } else {\n            this.ship.thrust.x -= this.friction * this.ship.thrust.x / this.FPS;\n            this.ship.thrust.y -= this.friction * this.ship.thrust.y / this.FPS;\n        }\n\n        //rotate ship\n        this.ship.angle += this.ship.rotation;\n\n        //move the ship\n        this.ship.x += this.ship.thrust.x;\n        this.ship.y += this.ship.thrust.y;\n\n        // centre dot \n        this.ctx.fillStyle = \"red\";\n        // console.log(\"this.ship.x @ display\", this.ship.x);\n        this.ctx.fillRect(this.ship.x - 1, this.ship.y - 1, 2, 2);\n\n        //handle edge of screen\n        if (this.ship.x < 0 - this.ship.radius) {\n            this.ship.x = this.canvasWidth + this.ship.radius;\n        } else if (this.ship.x > this.canvasWidth + this.ship.radius) {\n            this.ship.x = 0 - this.ship.radius;\n        }\n        if (this.ship.y < 0 - this.ship.radius) {\n            this.ship.y = this.canvasHeight + this.ship.radius;\n        } else if (this.ship.y > this.canvasHeight + this.ship.radius) {\n            this.ship.y = 0 - this.ship.radius;\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Display);\n\n//# sourceURL=webpack:///./src/display.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ \"./src/display.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n// import _ from 'lodash';\n\n// const Game = require(\"./game\");\n// const GameView = require(\"./game_view\");\n// const MovingObject = require(\"./moving_object.js\");\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    var canv = document.getElementById('game-canvas');\n    let canvasWidth = canv.width; \n    let canvasHeight = canv.height; \n    let ctx = canv.getContext('2d'); \n    let game = new _display__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvasWidth, canvasHeight, ctx);\n    document.querySelector(\"button\").addEventListener(\"click\", () => {\n        game.startGame();\n    }) ;\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass Ship {\n    constructor (canvasHeight, canvasWidth, ctx) {\n        this.canvasHeight = canvasHeight;\n        this.canvasWidth = canvasWidth;\n        this.shipSize = 30; // ship height in px\n        this.ctx = ctx;\n        this.x = canvasWidth / 2;\n        this.y = canvasHeight / 2;\n        this.radius = this.shipSize / 2;\n        this.angle = 90 / 180 * Math.PI; // to convert to radians \n        this.rotation = 0;\n        this.thrusting = false;\n        this.shipThrust = 5; //acceleration of the ship in pixels per second per second\n        this.turnSpeed = 150; //Turn speed in degrees per second (check 360 if need to)\n        this.thrustX = 0;        \n        this.thrustY = 0;        \n\n        this.thrust = {\n            x: 0,\n            y: 0\n        };\n    }\n\n    // thurst(){\n    //     this.x = 0;\n    //     this.y = 0;\n    // }\n\n    drawShip() {\n        this.ctx.beginPath();\n         \n        this.ctx.strokeStyle = \"white\";\n        this.ctx.lineWidth = this.shipSize / 20;\n        this.ctx.moveTo( //nose of the rectangular ship\n            this.x + 4 / 3 * this.radius * Math.cos(this.angle),\n            this.y - 4 / 3 * this.radius * Math.sin(this.angle)\n        );\n\n        this.ctx.lineTo( //rear left of the ship\n            this.x - this.radius * (2 / 3 * Math.cos(this.angle) + Math.sin(this.angle)),\n            this.y + this.radius * (2 / 3 * Math.sin(this.angle) - Math.cos(this.angle))\n        );\n\n        this.ctx.lineTo( //rear right of the ship\n            this.x - this.radius * (2 / 3 * Math.cos(this.angle) - Math.sin(this.angle)),\n            this.y + this.radius * (2 / 3 * Math.sin(this.angle) + Math.cos(this.angle))\n        );\n\n        this.ctx.closePath();\n        this.ctx.stroke();\n    } \n\n    drawBouding() {\n        this.ctx.strokeStyle = \"lime\";\n        this.ctx.beginPath();\n        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);\n        this.ctx.stroke();\n    }\n\n    drawThrust() {\n        //Draw the thruster\n\n        this.ctx.beginPath();\n        this.ctx.fillStyle = \"red\";\n        this.ctx.strokeStyle = \"yellow\";\n        this.ctx.lineWidth = this.shipSize / 10;\n        this.ctx.moveTo( //rear left\n            this.x - this.radius * (2 / 3 * Math.cos(this.angle) + 0.5 * Math.sin(this.angle)),\n            this.y + this.radius * (2 / 3 * Math.sin(this.angle) - 0.5 * Math.cos(this.angle))\n        );\n\n        this.ctx.lineTo( //rear center (behind the ship)\n            this.x - this.radius * 6 / 3 * Math.cos(this.angle),\n            this.y + this.radius * 6 / 3 * Math.sin(this.angle)\n        );\n\n        this.ctx.lineTo( //rear right \n            this.x - this.radius * (2 / 3 * Math.cos(this.angle) - 0.5 * Math.sin(this.angle)),\n            this.y + this.radius * (2 / 3 * Math.sin(this.angle) + 0.5 * Math.cos(this.angle))\n        );\n\n        this.ctx.closePath();\n        this.ctx.fill();\n        this.ctx.stroke();\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ship);\n\n\n\n// draw the player ship\n// ctx.strokeStyle = \"white\",\n//     ctx.lineWidth = shipSize / 15;\n// ctx.beginPath();\n\n// ctx.moveTo( //nose of the rectangular ship\n//     ship.x + 4 / 3 * ship.radious * Math.cos(ship.angle),\n//     ship.y - 4 / 3 * ship.radious * Math.sin(ship.angle)\n// );\n\n// ctx.lineTo( //rear left of the ship\n//     ship.x - ship.radious * (2 / 3 * Math.cos(ship.angle) + Math.sin(ship.angle)),\n//     ship.y + ship.radious * (2 / 3 * Math.sin(ship.angle) - Math.cos(ship.angle))\n// );\n\n// ctx.lineTo( //rear right of the ship\n//     ship.x - ship.radious * (2 / 3 * Math.cos(ship.angle) - Math.sin(ship.angle)),\n//     ship.y + ship.radious * (2 / 3 * Math.sin(ship.angle) + Math.cos(ship.angle))\n// );\n\n// ctx.closePath();\n// ctx.stroke(); \n\n\n\n// var ship = {\n//     x: canv.width / 2,\n//     y: canv.height / 2,\n//     radious: shipSize / 2,\n//     angle: 90 / 180 * Math.PI, // to convert to radians \n//     rotation: 0,\n//     thrusting: false,\n//     thrust: {\n//         x: 0,\n//         y: 0\n//     }\n// };\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ })

/******/ });