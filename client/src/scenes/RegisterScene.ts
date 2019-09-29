import { Scene } from "phaser";

export class RegisterScene extends Scene {
  protected register_music: any;

  public constructor() {
    super({ key: "RegisterScene" });
  }

  public preload() {
    // Load assets here
    this.load.audio('register_music', 'assets/audio/music/register.mp3');

    this.sound.pauseOnBlur = false;
  }

  public create() {
    // Construct world
    this.register_music = this.sound.add('register_music', {loop: true});
    this.register_music.play();
  }

  public update() {
    // update stuff
  }
}
