import { Scene } from "phaser";

export class MainGame extends Scene {
  protected room: any;

  public constructor(room: any) {
    super({ key: "MainGame" });
    this.room = room;
    console.log(this.room);
  }

  public preload() {
    // Load assets here
    // this.load.image("ship", "../../../assets/spaceShips_001.png");
    // this.load.image("star", "../../../assets/star_gold.png");
  }

  public create() {
    // Construct world
    // this.room.clients.map((client: any) => {
    //   console.log(client.id);
    // });
    console.log(this.room.state);
  }

  public update() {
    // update stuff
  }
}
