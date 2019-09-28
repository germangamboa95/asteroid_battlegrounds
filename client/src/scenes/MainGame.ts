import { Phaser, Scene } from "phaser";

export class MainGame extends Scene {
  protected room: any;
  protected sprite: Phaser.GameObjects.Sprite;
  protected player: any;
  protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  protected stage_01_music: any;
  protected asteroid_explode: any;
  protected laser: any;
  protected missile_launch: any;
  protected players_get_ready: any;
  protected powerup: any;
  protected ship_explode: any;
  protected ship_hit: any;
  protected ship: any;

  public constructor(room: any) {
    super({ key: "MainGame" });
    console.log(room);
    this.room = room;
  }

  public preload() {
    // Load assets here
    this.load.audio("stage_01_music", "../../dist/assets/music/stage_01.mp3");
    this.load.audio(
      "asteroid_explode",
      "../../dist/assets/audio/sfx/asteroid_explode.mp3"
    );
    this.load.audio("laser", "../../dist/assets/audio/sfx/laser.mp3");
    this.load.audio(
      "missile_launch",
      "../../dist/assets/audio/sfx/missile_launch.mp3"
    );
    this.load.audio(
      "players_get_ready",
      "../../dist/assets/audio/sfx/players_get_ready.mp3"
    );
    this.load.audio("powerup", "../../dist/assets/audio/sfx/powerup.mp3");
    this.load.audio(
      "ship_explode",
      "../../dist/assets/audio/sfx/ship_explode.mp3"
    );
    this.load.audio("ship_hit", "../../dist/assets/audio/sfx/ship_hit.mp3");
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

    this.stage_01_music = this.sound.add("stage_01_music", { loop: true });
    this.asteroid_explode = this.sound.add("asteroid_explode");
    this.laser = this.sound.add("laser");
    this.missile_launch = this.sound.add("missile_launch");
    this.players_get_ready = this.sound.add("players_get_ready");
    this.powerup = this.sound.add("powerup");
    this.ship_explode = this.sound.add("ship_explode");
    this.ship_hit = this.sound.add("ship_hit");
    this.ship = this.sound.add("ship");

    this.stage_01_music.play();
  }

  public update() {
    if (this.cursors.left.isDown) {
      this.room.send({ x: -1 });
    }
    if (this.cursors.right.isDown) {
      this.room.send({ x: 1 });
    }
    if (this.cursors.up.isDown) {
      this.room.send({ y: -1 });
    }
    if (this.cursors.down.isDown) {
      this.room.send({ y: 1 });
    }
    this.player.x = this.room.state.players[this.room.sessionId].x;
    this.player.y = this.room.state.players[this.room.sessionId].y;
  }
}
