import "babel-polyfill";
import Phaser from "phaser";
import { EndGameScene } from "./scenes/EndGameScene";
import { LoadingScene } from "./scenes/LoadingScene";
import { LobbyScene } from "./scenes/LobbyScene";
import { MainGame } from "./scenes/MainGame";
import { RegisterScene } from "./scenes/RegisterScene";

//@ts-ignore
window.WebGLTexture = () => {};

async function init() {
  //@ts-ignore
  const room = window.room;

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
    scene: new MainGame(room),

    autoFocus: false
  };

  const game = new Phaser.Game(config);
  //@ts-ignore
  window.gameLoaded();
}

init();
