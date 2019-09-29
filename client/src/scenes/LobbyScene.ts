import { Scene } from "phaser";

export class LobbyScene extends Scene {
  protected lobby_music: any;

  public constructor() {
    super({ key: "LobbyScene" });
  }

  public preload() {
    // Load assets here
    this.load.audio('lobby_music', 'assets/audio/music/lobby.mp3');

    this.sound.pauseOnBlur = false;
  }

  public create() {
    // Construct world
    this.lobby_music = this.sound.add('lobby_music', {loop: true});
    this.lobby_music.play();
  }

  public update() {
    // update stuff
  }
}
