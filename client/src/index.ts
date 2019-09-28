import "babel-polyfill";
import * as Colyseus from "colyseus.js";
import Phaser from "phaser";
import { EndGameScene } from "./scenes/EndGameScene";
import { LoadingScene } from "./scenes/LoadingScene";
import { LobbyScene } from "./scenes/LobbyScene";
import { MainGame } from "./scenes/MainGame";
import { RegisterScene } from "./scenes/RegisterScene";

export const CLIENT_HEIGHT = 600;
export const CLIENT_WIDTH = 800;

async function init() {
  const connection = await new Colyseus.Client("ws://localhost:2567");

  const room = await connection.joinOrCreate("game");

  const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
        gravity: { y: 0 }
      }
    },
    scene: new MainGame(room),

    autoFocus: false
  };

  const game = new Phaser.Game(config);
}

init();
