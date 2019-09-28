import * as Colyseus from "colyseus.js";

export class Boot {
  protected connection: Colyseus.Client;

  public constructor() {
    this.connection = new Colyseus.Client("ws://localhost:2567");
  }

  public async loadRoom() {
    const c = await this.connection.joinOrCreate("chat");
    return c;
  }
}
