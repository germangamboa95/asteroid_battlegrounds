import * as Colyseus from "colyseus.js";
import Phaser from "phaser";
import { EndGameScene } from "./scenes/EndGameScene";
import { LoadingScene } from "./scenes/LoadingScene";
import { LobbyScene } from "./scenes/LobbyScene";
import { MainGame } from "./scenes/MainGame";
import { RegisterScene } from "./scenes/RegisterScene";

let client: Colyseus.Client = new Colyseus.Client("ws://localhost:2567");

client
  .joinOrCreate("chat")
  .then((room: Colyseus.Room) => {
    console.log(room.state);
    room.state.onChange = changes => {
      changes.forEach(change => {
        console.log(change.field);
        console.log(change.value);
        console.log(change.previousValue);
      });
    };
  })
  .catch(e => {
    console.log("JOIN ERROR", e);
  });

const config = {
  type: Phaser.AUTO,
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
  scene: [LoadingScene, RegisterScene, LobbyScene, MainGame, EndGameScene],

  autoFocus: false
};
