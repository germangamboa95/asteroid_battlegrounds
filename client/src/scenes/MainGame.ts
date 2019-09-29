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

  protected text: any;
  protected bullets: any;
  protected asteroids: any;
  protected lastFired = 0;

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
    this.load.image("bullet", "assets/images/sfx/bullets.png");
    this.load.image("asteroid", "assets/images/asteroids/asteroid_brown.png");
    this.load.image(
      "asteroid_half",
      "assets/images/asteroids/asteroid_brown_0.5.png",
    );
    this.load.image("background", "assets/images/background.gif");


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


    this.add.image(800, 600, "background");

    
    this.bullets = this.physics.add.group();

    this.asteroids = this.physics.add.group({
      key: "asteroid",
      repeat: 12,
      setXY: { x: 150, y: 150, stepX: 300, stepY: 300 },
    });
  
    this.asteroids.children.iterate(function(child: any) {
      child.setAngularVelocity(25);
      child.setVelocityX(Phaser.Math.FloatBetween(0, 100));
      child.setVelocityY(Phaser.Math.FloatBetween(0, 100));
    });
  
    this.player = this.physics.add.image(800, 1200, "ship");
    this.player.setDamping(true);
    this.player.setDrag(0.99);
    this.player.setMaxVelocity(200);
    this.player.setSize(40, 110, true);
  
    this.cursors = this.input.keyboard.createCursorKeys();
  
    this.text = this.add.text(10, 10, "", { font: "16px Courier", fill: "#00ff00" });
  
    // Collider stuff
    this.physics.add.overlap(this.bullets, this.asteroids, this.explodeAsteroid, undefined, this);
    this.physics.add.overlap(this.asteroids, this.asteroids, this.explodeAsteroid, undefined, this);
    this.physics.add.overlap(this.player, this.asteroids, this.explodePlayer, undefined, this);
  
    // Follow Player
    this.cameras.main.startFollow(this.player);



    this.cursors = this.input.keyboard.createCursorKeys();
    console.log(this.room.state.players);

    this.room.state.players.onAdd = (player, key) => {
      console.log(player, "has been added at", key);

      // add your player entity to the game world!

      // If you want to track changes on a child object inside a map, this is a common pattern:
      player.onChange = changes => {
        changes.forEach(change => {
          console.log(change);
          this.players[key][change.field] = change.value;
        });
      };

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

  public update(time: any) {
    // Calculates new playerbox changes
    let playerBoxX = 75 - 40 * Math.sin(1.57 + this.player.rotation * 2); // 1.57 is pi/2
    let playerBoxY = 75 + 40 * Math.cos(this.player.rotation * 2);

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(
        this.player.rotation,
        200,
        this.player.body.acceleration,
      );
    } else {
      this.player.setAcceleration(0);
    }

    if (this.cursors.left.isDown) {
      this.player.setAngularVelocity(-300);
      this.player.setSize(playerBoxX, playerBoxY, true);
    } else if (this.cursors.right.isDown) {
      this.player.setAngularVelocity(300);
      this.player.setSize(playerBoxX, playerBoxY, true);
    } else {
      this.player.setAngularVelocity(0);
    }

    // You can shoot while moving
    if (this.cursors.space.isDown && time > this.lastFired) {
      this.fireBullet(time);
  }

    this.text.setText("Speed: " + this.player.body.speed);

    this.physics.world.wrap(this.player, 32);

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


  /**
   * Shoots bullet from ship
   */
  public fireBullet(time: any) {
    let bulletSpeed = 300;

    let bullet = this.bullets.create(this.player.x, this.player.y, "bullet");
    bullet.setVelocityX(bulletSpeed * Math.cos(this.player.rotation));
    bullet.setVelocityY(bulletSpeed * Math.sin(this.player.rotation));
    this.lastFired = time + 400;
  }

  /**
   * Calculates most of hitbox scan
   */
  public explodeAsteroid(bullet: any, asteroid: any) {
    //   calls = calls++;
    //   if (calls > 10) return;

    asteroid.disableBody(true, true);

    // Sample is an asteroid in this case, explodedTimes is a property I made up
    if (asteroid.explodedTimes !== 1) {
      for (let i = 1; i < 4; i++) {
        let sample = this.asteroids.create(
          asteroid.x + 35 * Math.cos(2.1 * i),
          asteroid.y + 35 * Math.sin(2.1 * i),
          "asteroid_half",
        );

        sample.setSize(50, 50);
        sample.setVelocityX(100 * Math.cos(2.1 * i)); // app using 6.28 divide by 3 for 120degrees * i
        sample.setVelocityY(100 * Math.sin(2.1 * i));
        sample.explodedTimes = 1; // I just made myself a new key-value prop
        sample.setAngularVelocity(100);
      }
    }
    bullet.disableBody(true, true);
  }
  /**
   * Blow up player
   */
  public explodePlayer(player: any, asteroid: any) {
    asteroid.disableBody(true, true);
    player.disableBody(true, true);
  }
}
