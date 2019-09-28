import { Scene } from "phaser";

export class EndGameScene extends Scene {
  protected victory: any;
  protected defeat: any;

  public constructor() {
    super({ key: "EndGameScene" });
  }

  public preload() {
    // Load assets here
    this.load.audio('victory', '../../dist/assets/sfx/victory.mp3');
    this.load.audio('defeat', '../../dist/assets/sfx/defeat.mp3');
  }

  public create() {
    // Construct world
    this.victory = this.sound.add('victory');
    this.defeat = this.sound.add('defeat');

    // todo: get actual victory status
    let player_is_victorious = true;
    if (player_is_victorious) {
      this.victory.play();
    } else {
      this.defeat.play();
    }
  }

  public update() {
    // update stuff
  }
}
