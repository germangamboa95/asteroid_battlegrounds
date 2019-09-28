import { Phaser, Scene } from "phaser";

export class MainGame extends Scene {
  protected room: any;

  public constructor(room: any) {
    super({ key: "MainGame" });
    console.log(room);
    this.room = room;
  }

  public preload() {
    this.load.image("ship", "../../assets/spaceShips_001.png");
  }

  public create() {
    // Construct world
    this.input.keyboard.on("keyup_W", event => {
      this.room.send({ event: "W" });
    });
    this.input.keyboard.on("keyup_D", event => {
      this.room.send({ event: "D" });
    });
    this.input.keyboard.on("keyup_A", event => {
      this.room.send({ event: "A" });
    });
    this.input.keyboard.on("keyup_S", event => {
      this.room.send({ event: "S" });
    });
  }

  public update() {
    // update stuff
  }
}
