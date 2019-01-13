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

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nclass Display {\n    constructor(canvasWidth, canvasHeight, ctx){\n        this.ship = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        this.canvasWidth = canvasWidth;\n        this.canvasHeight = canvasHeight;\n        this.ctx = ctx;\n\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Display);\n\n//# sourceURL=webpack:///./src/display.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ \"./src/display.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n// import _ from 'lodash';\n\n// const Game = require(\"./game\");\n// const GameView = require(\"./game_view\");\n// const MovingObject = require(\"./moving_object.js\");\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    var canv = document.getElementById('game-canvas');\n    let canvasWidth = canv.width; \n    let canvasHeight = canv.height; \n\n    const FPS = 30; // frames per seconds\n    const shipSize = 30; // ship height in px\n    const turnSpeed = 360; //Turn speed in degrees per second\n    const shipThrust = 5; //acceleration of the ship in pixels per second per second\n    const friction = 0.7; //friction of spaceship (0 - 1)\n    var ctx = canv.getContext('2d'); \n    \n    \n\n    // canvasEl.height = window.innerHeight;\n    // canvasEl.width = window.innerWidth;\n    // canvasEl.width = Game.DIM_X;\n    // canvasEl.hight = Game.DIM_Y;\n    // canvasEl.width = 400;\n    // canvasEl.hight = 400;\n\n    // var ctx = canvasEl.getContext('2d');\n    // ctx.fillStyle = \"black\";\n\n\n    // var ship = {\n    //     x: canv.width / 2,\n    //     y: canv.height / 2,\n    //     radious: shipSize / 2,\n    //     angle: 90 / 180 * Math.PI, // to convert to radians \n    //     rotation: 0,\n    //     thrusting: false,\n    //     thrust: {\n    //         x: 0,\n    //         y: 0\n    //     }\n    // };\n\n\n\n    //Set up event handlers\n    document.addEventListener(\"keydown\", keyDown);\n    document.addEventListener(\"keyup\", keyUp);\n\n    function keyDown(event) {\n        switch(event.keyCode) {\n            case 37: // left arrow down = rotation ship left\n                ship.rotation = turnSpeed / 180 * Math.PI / FPS; \n                break;\n            case 38: // up arrow down = thrust the ship forward\n                ship.thrusting = true;\n                break;\n            case 39: //right arrow down = rotation ship right\n                ship.rotation = - turnSpeed / 180 * Math.PI / FPS; \n                break;\n        }\n            \n    }\n\n    function keyUp(event) {\n        switch (event.keyCode) {\n            case 37: // left arrow up = stop rotating ship left\n                ship.rotation = 0;\n                break;\n            case 38: // up arrow up = stop thrusting\n                ship.thrusting = false;\n                break;\n            case 39: //right arrow up = stop rotating ship right\n                ship.rotation = 0;\n                break;\n        }\n    }\n\n        // set up the game loop:\n    setInterval(update, 1000 / FPS);\n    function update () {\n        // draw space \n        ctx.fillStyle = \"black\";\n        ctx.fillRect(0, 0, canv.width, canv.height);\n\n        // draw the player ship\n        let ship = new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvasHeight, canvasWidth, ctx);\n        ship.drawShip();\n        \n        // thrust the ship\n        if (ship.thrusting) {\n            ship.thrust.x += shipThrust * Math.cos(ship.angle) /  FPS;\n            ship.thrust.y -= shipThrust * Math.sin(ship.angle) /  FPS;\n\n\n        } else {\n            ship.thrust.x -= friction * ship.thrust.x / FPS;\n            ship.thrust.y -= friction * ship.thrust.y / FPS;\n        }\n        \n        // draw the player ship\n        // ctx.strokeStyle = \"white\",\n        // ctx.lineWidth = shipSize / 15;\n        // ctx.beginPath();\n\n        // ctx.moveTo( //nose of the rectangular ship\n        //     ship.x + 4/3 * ship.radious * Math.cos(ship.angle),\n        //     ship.y - 4/3 * ship.radious * Math.sin(ship.angle)\n        // );\n\n        // ctx.lineTo( //rear left of the ship\n        //     ship.x - ship.radious * (2/3 * Math.cos(ship.angle) + Math.sin(ship.angle)),\n        //     ship.y + ship.radious * (2/3 * Math.sin(ship.angle) - Math.cos(ship.angle))\n        // );\n\n        // ctx.lineTo( //rear right of the ship\n        //     ship.x - ship.radious * (2/3 * Math.cos(ship.angle) - Math.sin(ship.angle)),\n        //     ship.y + ship.radious * (2/3 * Math.sin(ship.angle) + Math.cos(ship.angle))\n        // );\n\n        // ctx.closePath();\n        // ctx.stroke(); \n\n\n        //rotate ship\n        ship.angle += ship.rotation;\n\n        //move the ship\n        ship.x += ship.thrust.x;\n        ship.y += ship.thrust.y;\n\n        //handle edge of screen\n        if (ship.x < 0 - ship.radious) {\n            ship.x = canv.width + ship.radious;\n        } else if (ship.x > canv.width + ship.radious) {\n            ship.x = 0 - ship.radious;\n        }\n        if (ship.y < 0 - ship.radious) {\n            ship.y = canv.height + ship.radious;\n        } else if (ship.y > canv.height + ship.radious) {\n            ship.y = 0 - ship.radious;\n        }\n\n        //centre dot \n        ctx.fillStyle = \"red\";\n        ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);\n    }\n\n});\n\n// window.MovingObject = MovingObject;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass Ship {\n    constructor (canvasHeight, canvasWidth, ctx) {\n        this.canvasHeight = canvasHeight;\n        this.canvasWidth = canvasWidth;\n        this.shipSize = 30;\n        this.ctx = ctx;\n        this.x = canvasWidth / 2;\n        this.y = canvasHeight / 2;\n        this.radius = this.shipSize / 2;\n        this.angle = 90 / 180 * Math.PI; // to convert to radians \n        this.rotation = 0;\n        this.thrusting = false;\n        this.thrust = {\n            x: 0,\n            y: 0\n        };\n    }\n\n    thurst(){\n        this.x = 0;\n        this.y = 0;\n    }\n\n    drawShip() {\n        this.ctx.beginPath();\n        this.ctx.strokeStyle = \"white\";\n        this.ctx.lineWidth = this.shipSize / 15;\n        this.ctx.moveTo( //nose of the rectangular ship\n            this.x + 4 / 3 * this.radius * Math.cos(this.angle),\n            this.y - 4 / 3 * this.radius * Math.sin(this.angle)\n        );\n\n        this.ctx.lineTo( //rear left of the ship\n            this.x - this.radius * (2 / 3 * Math.cos(this.angle) + Math.sin(this.angle)),\n            this.y + this.radius * (2 / 3 * Math.sin(this.angle) - Math.cos(this.angle))\n        );\n\n        this.ctx.lineTo( //rear right of the ship\n            this.x - this.radius * (2 / 3 * Math.cos(this.angle) - Math.sin(this.angle)),\n            this.y + this.radius * (2 / 3 * Math.sin(this.angle) + Math.cos(this.angle))\n        );\n\n        this.ctx.closePath();\n        this.ctx.stroke(); \n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ship);\n\n\n\n// draw the player ship\n// ctx.strokeStyle = \"white\",\n//     ctx.lineWidth = shipSize / 15;\n// ctx.beginPath();\n\n// ctx.moveTo( //nose of the rectangular ship\n//     ship.x + 4 / 3 * ship.radious * Math.cos(ship.angle),\n//     ship.y - 4 / 3 * ship.radious * Math.sin(ship.angle)\n// );\n\n// ctx.lineTo( //rear left of the ship\n//     ship.x - ship.radious * (2 / 3 * Math.cos(ship.angle) + Math.sin(ship.angle)),\n//     ship.y + ship.radious * (2 / 3 * Math.sin(ship.angle) - Math.cos(ship.angle))\n// );\n\n// ctx.lineTo( //rear right of the ship\n//     ship.x - ship.radious * (2 / 3 * Math.cos(ship.angle) - Math.sin(ship.angle)),\n//     ship.y + ship.radious * (2 / 3 * Math.sin(ship.angle) + Math.cos(ship.angle))\n// );\n\n// ctx.closePath();\n// ctx.stroke(); \n\n\n\n// var ship = {\n//     x: canv.width / 2,\n//     y: canv.height / 2,\n//     radious: shipSize / 2,\n//     angle: 90 / 180 * Math.PI, // to convert to radians \n//     rotation: 0,\n//     thrusting: false,\n//     thrust: {\n//         x: 0,\n//         y: 0\n//     }\n// };\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ })

/******/ });