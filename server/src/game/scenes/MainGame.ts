import { Scene } from "phaser";

export class MainGame extends Scene {
  protected room: any;

  public constructor(room: any) {
    super({ key: "MainGame" });
    this.room = room;
  }

  public preload() {
    // Load assets here
    // this.load.image("ship", "../../../assets/spaceShips_001.png");
    // this.load.image("star", "../../../assets/star_gold.png");
  }

  public create() {
    // Construct world
  }

  public update() {
    // update stuff
  }
}
