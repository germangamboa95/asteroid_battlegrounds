import { Scene } from "phaser";

export class MainGame extends Scene {
  public constructor() {
    super({ key: "MainGame" });
  }

  public preload() {
    // Load assets here
    this.load.audio('bass', 'assets/music/stage_01.mp3');
    this.load.audio('bass', 'assets/sfx/asteroid_explode.mp3');
    this.load.audio('bass', 'assets/sfx/defeat.mp3');
    this.load.audio('bass', 'assets/sfx/laser.mp3');
    this.load.audio('bass', 'assets/sfx/missile_launch.mp3');
    this.load.audio('bass', 'assets/sfx/players_get_ready.mp3');
    this.load.audio('bass', 'assets/sfx/powerup.mp3');
    this.load.audio('bass', 'assets/sfx/ship_explode.mp3');
    this.load.audio('bass', 'assets/sfx/ship_hit.mp3');
    this.load.audio('bass', 'assets/sfx/victory.mp3');

  }

  public create() {
    // Construct world
  }

  public update() {
    // update stuff
  }
}
