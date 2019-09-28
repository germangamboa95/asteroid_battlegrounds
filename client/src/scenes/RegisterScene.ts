import { Scene } from "phaser";

export class RegisterScene extends Scene {
  protected menu_music: any;

  public constructor() {
    super({ key: "RegisterScene" });
  }

  public preload() {
    // Load assets here
    this.load.audio('menu_music', 'assets/audio/music/menu.mp3');
  }

  public create() {
    // Construct world
    this.menu_music = this.sound.add('menu_music', {loop: true});
    this.menu_music.play();
  }

  public update() {
    // update stuff
  }
}
