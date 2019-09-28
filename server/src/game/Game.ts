import "babel-polyfill";
import { Boot } from "./Boot";
import Phaser from "phaser";

const leBoot = new Boot();
leBoot.loadRoom().then(room => {
  // console.log(room);
});

const config = {
  type: Phaser.HEADLESS,
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
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  autoFocus: false
};

const game = new Phaser.Game(config);

function preload() {}

function create() {}

function update() {}
