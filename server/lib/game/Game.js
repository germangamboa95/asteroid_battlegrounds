"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("babel-polyfill");
const phaser_1 = __importDefault(require("phaser"));
const MainGame_1 = require("./scenes/MainGame");
//@ts-ignore
window.WebGLTexture = () => { };
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const room = window.room;
        const config = {
            type: phaser_1.default.HEADLESS,
            parent: "phaser-example",
            width: 800,
            height: 600,
            physics: {
                default: "arcade",
                arcade: {
                    debug: false,
                    gravity: { y: 0 }
                }
            },
            scene: new MainGame_1.MainGame(room),
            autoFocus: false
        };
        const game = new phaser_1.default.Game(config);
        //@ts-ignore
        window.gameLoaded();
    });
}
init();
