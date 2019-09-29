"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
// @ts-ignore
const datauri_1 = __importDefault(require("datauri"));
const path_1 = __importDefault(require("path"));
const datauri = new datauri_1.default();
function setupAuthoritativePhaser(room) {
    jsdom_1.JSDOM.fromFile(path_1.default.join(__dirname, "./../../dist/index.html"), {
        // To run the scripts in the html file
        runScripts: "dangerously",
        // Also load supported external resources
        resources: "usable",
        // So requestAnimatinFrame events fire
        pretendToBeVisual: true,
        url: "http://localhost:2567"
    })
        .then(dom => {
        // @ts-ignore
        dom.window.gameLoaded = () => {
            console.log("Game is loaded");
        };
        dom.window.URL.createObjectURL = blob => {
            if (blob) {
                return datauri.format(blob.type, blob[Object.getOwnPropertySymbols(blob)[0]]._buffer).content;
            }
        };
        dom.window.URL.revokeObjectURL = objectURL => { };
        // @ts-ignore
        dom.window.room = room;
    })
        .catch(error => {
        console.log(error.message);
    });
}
exports.setupAuthoritativePhaser = setupAuthoritativePhaser;
