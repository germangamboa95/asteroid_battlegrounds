import { Room, Client } from "colyseus";
import { Schema, type, ArraySchema, MapSchema } from "@colyseus/schema";
import { setupAuthoritativePhaser } from "./nodeboot";

class Player extends Schema {
  @type("number")
  x: number = Math.ceil(Math.random() * 500);
  @type("number")
  y: number = Math.ceil(Math.random() * 500);
  @type("string")
  name: string = "Player Unkown";
}

class PlayerMap extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();
}

export class State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  something = "This attribute won't be sent to the client-side";

  createPlayer(id: string, name: string) {
    const player = new Player();
    player.name = name;
    this.players[id] = player;
  }

  removePlayer(id: string) {
    delete this.players[id];
  }

  movePlayer(id: string, movement: any) {
    if (movement.x) {
      this.players[id].x += movement.x;
    } else if (movement.y) {
      this.players[id].y += movement.y;
    }
  }
}

export class GameRoom extends Room<State> {
  maxClients = 2;

  onCreate(options: any) {
    this.setState(new State());

    let self = this;
    setupAuthoritativePhaser(self);
  }

  onJoin(client: Client, options: any) {
    this.state.createPlayer(client.sessionId, options.name);
  }

  onMessage(client: Client, message: any) {
    console.log(
      "StateHandlerRoom received message from",
      client.sessionId,
      ":",
      message
    );
    this.state.movePlayer(client.sessionId, message);
  }

  onLeave(client: Client, consented: boolean) {
    this.state.removePlayer(client.sessionId);
  }
  onDispose() {
    console.log("Dispose StateHandlerRoom");
  }
}
