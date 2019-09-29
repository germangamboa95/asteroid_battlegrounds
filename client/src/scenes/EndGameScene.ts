import { Scene } from "phaser";
import { CLIENT_HEIGHT, CLIENT_WIDTH } from "../index";

export class EndGameScene extends Scene {
  protected victory: any;
  protected defeat: any;
  private movieFrame: Phaser.GameObjects.Image;
  private movieTexture: Phaser.Textures.CanvasTexture;
  private video: HTMLVideoElement;
  private goToNextScene: boolean = false;
  private loopTimeout;

  public constructor() {
    super({ key: "EndGameScene" });
  }

  public preload() {
    // Load assets here
    this.load.audio("victory", "assets/audio/sfx/victory.mp3");
    this.load.audio("defeat", "assets/audio/sfx/defeat.mp3");
  }

  playVideo() {
    try {
      this.defeat.play();
      this.video.play();
      const fps = 30;
      const loop = () => {
        if (!this.video.paused && !this.video.ended && !this.goToNextScene) {
          this.movieTexture.context.drawImage(
            this.video,
            0,
            0,
            CLIENT_WIDTH,
            CLIENT_HEIGHT
          );
          this.movieTexture.refresh();
          this.loopTimeout = setTimeout(loop, 1000 / fps);
        }
      };
      loop();
    } catch (e) {
      console.log(e.message);
    }
  }

  create() {
    // Construct world
    this.victory = this.sound.add("victory");
    this.defeat = this.sound.add("defeat");
    this.movieTexture = this.textures.createCanvas(
      "gameOverMovie",
      CLIENT_WIDTH,
      CLIENT_HEIGHT
    );
    this.movieFrame = this.add
      .image(CLIENT_WIDTH / 2, CLIENT_HEIGHT / 2, "gameOverMovie")
      .setInteractive();
    this.video = document.createElement("video");
    this.video.src = "assets/videos/game_over.mp4";
    this.video.addEventListener("loadeddata", () => {
      this.playVideo();
    });
    this.video.addEventListener("ended", () => {
      this.nextScene();
    });
    this.video.addEventListener("pause", () => {
      this.nextScene();
    });
    this.pointerEvent = this.movieFrame.on("pointerdown", () => {
      this.video.pause();
    });
  }

  nextScene() {
    this.goToNextScene = true;
  }

  update() {
    if (this.goToNextScene) {
      this.goToNextScene = false;
      if (this.loopTimeout) {
        clearTimeout(this.loopTimeout);
      }
      this.movieFrame.destroy();
      this.movieTexture.destroy();
      this.video.remove();
      this.scene.start("RegisterScene");
    }
  }
}
