import { Room, Client } from "colyseus";
import { Schema, type, ArraySchema } from "@colyseus/schema";
import { setupAuthoritativePhaser } from "./nodeboot";

class MyCounter extends Schema {
  @type("number")
  counter: number = 0;
}

class Input extends Schema {
  @type("boolean")
  left: boolean = false;
  @type("boolean")
  right: boolean = false;
  @type("boolean")
  up: boolean = false;
}

class Player extends Schema {
  @type("number")
  rotation: number = 0;
  @type("number")
  x: number = Math.floor(Math.random() * 700) + 50;
  @type("number")
  y: number = Math.floor(Math.random() * 500) + 50;
  @type("number")
  playerId: number = 0;
  @type(Input)
  input: Input = new Input();
}

class PlayerList extends Schema {
  @type([Player])
  players: ArraySchema<Player> = new ArraySchema<Player>();
}

class GameRoomState extends Schema {
  @type(PlayerList)
  playerList = new PlayerList();
}

export class GameRoom extends Room {
  onCreate(options: any) {
    this.setState(new GameRoomState());
    let self = this;
    setupAuthoritativePhaser(self);
  }

  onJoin(client: Client, options: any) {
    console.log("someone joined");
  }
  onMessage(client: Client, message: any) {
    console.log(message);
  }
  onLeave(client: Client, consented: boolean) {}
  onDispose() {}
}
