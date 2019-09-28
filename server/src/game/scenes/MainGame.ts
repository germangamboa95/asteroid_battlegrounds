import { Scene } from "phaser";

export class MainGame extends Scene {
  protected room: any;

  public constructor(room: any) {
    super({ key: "MainGame" });
    this.room = room;
  }

  public preload() {}

  public create() {}

  public update() {}
}
