import { Phaser, Scene } from "phaser";

export class MainGame extends Scene {
  protected room: any;
  protected stage_01_music: any;
  protected asteroid_explode: any;
  protected defeat: any;
  protected laser: any;
  protected missile_launch: any;
  protected players_get_ready: any;
  protected powerup: any;
  protected ship_explode: any;
  protected ship_hit: any;
  protected victory: any;
  protected ship: any;

  public constructor(room: any) {
    super({ key: "MainGame" });
    console.log(room);
    this.room = room;
  }

  public preload() {
    // Load assets here
    this.load.audio('stage_01_music', '../../dist/assets/music/stage_01.mp3');
    this.load.audio('asteroid_explode', '../../dist/assets/sfx/asteroid_explode.mp3');
    this.load.audio('defeat', '../../dist/assets/sfx/defeat.mp3');
    this.load.audio('laser', '../../dist/assets/sfx/laser.mp3');
    this.load.audio('missile_launch', '../../dist/assets/sfx/missile_launch.mp3');
    this.load.audio('players_get_ready', '../../dist/assets/sfx/players_get_ready.mp3');
    this.load.audio('powerup', '../../dist/assets/sfx/powerup.mp3');
    this.load.audio('ship_explode', '../../dist/assets/sfx/ship_explode.mp3');
    this.load.audio('ship_hit', '../../dist/assets/sfx/ship_hit.mp3');
    this.load.audio('victory', '../../dist/assets/sfx/victory.mp3');
    this.load.image("ship", "../../dist/assets/sprites/spaceShips_001.png");
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


    this.stage_01_music = this.sound.add('stage_01_music', {loop: true});
    this.asteroid_explode = this.sound.add('asteroid_explode');
    this.defeat = this.sound.add('defeat');
    this.laser = this.sound.add('laser');
    this.missile_launch = this.sound.add('missile_launch');
    this.players_get_ready = this.sound.add('players_get_ready');
    this.powerup = this.sound.add('powerup');
    this.ship_explode = this.sound.add('ship_explode');
    this.ship_hit = this.sound.add('ship_hit');
    this.victory = this.sound.add('victory');
    this.ship = this.sound.add('ship');

    this.stage_01_music.play();

  }

  public update() {
    // update stuff
  }
}
