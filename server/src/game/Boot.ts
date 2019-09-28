import Colyseus from "colyseus.js";

export class Boot {
  protected connection: Colyseus.Client;

  protected _room: Colyseus.Room;

  public get room(): Colyseus.Room {
    return this._room;
  }

  public constructor() {
    this.connection = new Colyseus.Client("ws://localhost:2567");
    this.loadRoom();
  }

  protected async loadRoom() {
    this._room = await this.connection.joinOrCreate("chat");
  }
}
