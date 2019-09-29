"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = require("phaser");
class MainGame extends phaser_1.Scene {
    constructor(room) {
        super({ key: "MainGame" });
        this.room = room;
    }
    preload() { }
    create() { }
    update() { }
}
exports.MainGame = MainGame;
