import { Room, Client } from "colyseus";
import { Schema, type } from "@colyseus/schema";
import { setupAuthoritativePhaser } from "./nodeboot";

class MyCounter extends Schema {
  @type("number")
  counter: number = 0;
}

export class GameRoom extends Room {
  onCreate(options: any) {
    // Room was created instanciate new client-server
    setupAuthoritativePhaser();
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
