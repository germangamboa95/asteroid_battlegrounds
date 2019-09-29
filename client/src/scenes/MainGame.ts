import { Phaser, Scene } from "phaser";

export class MainGame extends Scene {
  protected room: any;
  protected sprite: Phaser.GameObjects.Sprite;
  protected players: any = {};
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
  protected player: any;

  public constructor(room: any) {
    super({ key: "MainGame" });
    this.room = room;
  }

  public preload() {
    // Load assets here

    this.load.audio("stage_01_music", "assets/audio/music/stage_01.mp3");

    this.load.audio(
      "asteroid_explode",
      "assets/audio/sfx/asteroid_explode.mp3"
    );
    this.load.audio("laser", "assets/audio/sfx/laser.mp3");
    this.load.audio("missile_launch", "assets/audio/sfx/missile_launch.mp3");
    this.load.audio(
      "players_get_ready",
      "assets/audio/sfx/players_get_ready.mp3"
    );
    this.load.audio("powerup", "assets/audio/sfx/powerup.mp3");
    this.load.audio("ship_explode", "assets/audio/sfx/ship_explode.mp3");
    this.load.audio("ship_hit", "assets/audio/sfx/ship_hit.mp3");
    this.load.image("ship", "assets/images/ships/ship_blue.png");

    this.sound.pauseOnBlur = false;
  }

  public create() {
    this.stage_01_music = this.sound.add("stage_01_music", { loop: true });
    this.asteroid_explode = this.sound.add("asteroid_explode");
    this.laser = this.sound.add("laser");
    this.missile_launch = this.sound.add("missile_launch");
    this.players_get_ready = this.sound.add("players_get_ready");
    this.powerup = this.sound.add("powerup");
    this.ship_explode = this.sound.add("ship_explode");
    this.ship_hit = this.sound.add("ship_hit");

    this.stage_01_music.play();

    this.cursors = this.input.keyboard.createCursorKeys();
    console.log(this.room.state.players);

    this.room.state.players.onAdd = (player, key) => {
      console.log(player, "has been added at", key);

      // add your player entity to the game world!

      // If you want to track changes on a child object inside a map, this is a common pattern:
      // player.onChange = changes => {
      //   changes.forEach(change => {
      //     console.log(change);
      //     this.players[key][change.field] = change.value;
      //   });
      // };

      let s = this.physics.add
        .image(50, 50, "ship")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(53, 40);
      s.setDrag(100);
      s.setAngularDrag(100);
      s.setMaxVelocity(200);
      this.players[key] = s;

      // force "onChange" to be called immediatelly
      player.triggerAll();
    };

    console.log(this.room.state.players);

    Object.keys(this.room.state.players).map(key => {
      console.log(key);
      let s = this.physics.add
        .image(50, 50, "ship")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(53, 40);
      s.setDrag(100);
      s.setAngularDrag(100);
      s.setMaxVelocity(200);

      this.players[key] = s;
    });

    this.room.state.players.onRemove = (player, key) => {
      this.players[key].destroy();
      delete this.players[key];
    };

    this.room.state.players.onChange = (player, key) => {
      console.log(player, "have changes at", key);
      this.players[key].x = player.x;
      this.players[key].y = player.y;
    };
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
  }
}
