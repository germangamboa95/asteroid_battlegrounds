import "babel-polyfill";
import Phaser from "phaser";
import { EndGameScene } from "./scenes/EndGameScene";
import { LoadingScene } from "./scenes/LoadingScene";
import { MainGame } from "./scenes/MainGame";
import { RegisterScene } from "./scenes/RegisterScene";

export const CLIENT_WIDTH = 800;
export const CLIENT_HEIGHT = 600;

async function init() {
  const config = {
    type: Phaser.AUTO,
    parent: "container",
    width: 800,
    height: 600,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        fps: 60,
        debug: true,
        gravity: { y: 0 }
      }
    },
    scene: [LoadingScene, RegisterScene, MainGame, EndGameScene],
    autoFocus: false,
    
  };

  const game = new Phaser.Game(config);
  // game.scene.start("MainGame");
}

init();
