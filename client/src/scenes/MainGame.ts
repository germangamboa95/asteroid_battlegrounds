import { Phaser, Scene } from "phaser";

export class MainGame extends Scene {
  protected room: any;

  public constructor(room: any) {
    super({ key: "MainGame" });
    console.log(room);
    this.room = room;
  }

  public preload() {
    // Load assets here
    this.load.audio('stage_01', '../../assets/music/stage_01.mp3');
    this.load.audio('asteroid_explode', '../../assets/sfx/asteroid_explode.mp3');
    this.load.audio('defeat', '../../assets/sfx/defeat.mp3');
    this.load.audio('laser', '../../assets/sfx/laser.mp3');
    this.load.audio('missile_launch', '../../assets/sfx/missile_launch.mp3');
    this.load.audio('players_get_ready', '../../assets/sfx/players_get_ready.mp3');
    this.load.audio('powerup', '../../assets/sfx/powerup.mp3');
    this.load.audio('ship_explode', '../../assets/sfx/ship_explode.mp3');
    this.load.audio('ship_hit', '../../assets/sfx/ship_hit.mp3');
    this.load.audio('victory', '../../assets/sfx/victory.mp3');
    this.load.image("ship", "../../assets/sprites/spaceShips_001.png");
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
