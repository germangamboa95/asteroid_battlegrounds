import { Phaser, Scene } from "phaser";

export class MainGame extends Scene {
  protected room: any;
  protected sprite: Phaser.GameObjects.Sprite;
  protected player: any;
  protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  public constructor(room: any) {
    super({ key: "MainGame" });
    console.log(room);
    this.room = room;
  }

  public preload() {
    this.load.image("ship", "../../assets/spaceShips_001.png");
  }

  public create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add
      .image(0, 0, "ship")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(53, 40);
    this.player.setDrag(100);
    this.player.setAngularDrag(100);
    this.player.setMaxVelocity(200);

    this.room.state.players.onAdd = (player, key) => {
      console.log(player, "has been added at", key);

      // add your player entity to the game world!

      // If you want to track changes on a child object inside a map, this is a common pattern:
      player.onChange = function(changes) {
        changes.forEach(change => {
          console.log(change.field);
          console.log(change.value);
          console.log(change.previousValue);
        });
      };

      // force "onChange" to be called immediatelly
      player.triggerAll();
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
    this.player.x = this.room.state.players[this.room.sessionId].x;
    this.player.y = this.room.state.players[this.room.sessionId].y;
  }
}
