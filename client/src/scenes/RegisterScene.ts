import { Scene } from "phaser";
import { CLIENT_HEIGHT, CLIENT_WIDTH } from "../index";

export class RegisterScene extends Scene {
  protected menu_music: any;
  private movieFrame: Phaser.GameObjects.Image;
  private movieTexture: Phaser.Textures.CanvasTexture;
  private video: HTMLVideoElement;
  private submitButton: HTMLButtonElement;
  private playerName: HTMLInputElement;
  private gameTitle: HTMLElement
  private goToNextScene: boolean = false;
  private loopTimeout;

  public constructor() {
    super({ key: "RegisterScene" });
  }

  public preload() {
    // Load assets here
    this.load.audio("menu_music", "assets/audio/music/menu.mp3");
    this.sound.pauseOnBlur = false;
  }

  public create() {
    // Construct world
    this.menu_music = this.sound.add("menu_music", { loop: true });
    this.menu_music.play();
    this.createForm();
    this.createVideo();
  }

  update() {
    if (this.goToNextScene) {
      if (this.loopTimeout) {
        clearTimeout(this.loopTimeout);
      }
      this.video.remove();
      this.movieTexture.destroy();
      this.scene.switch("LobbyScene");
    }
  }

  createForm() {
    this.submitButton = document.createElement("button");
    this.submitButton.innerText = "Join a Game";
    Object.assign(this.submitButton.style, {
      position: "absolute",
      top: "calc(50% - 30px)",
      left: "calc(50% - 110px)",
      width: "200px",
      height: "40px",
      padding: "10px",
      "background-color": "white",
      "border-radius": "10px",
      "border-style": "solid",
      "border-color": "skyblue",
      color: "red",
      "font-weight": 800
    });
    this.submitButton.addEventListener("click", () => {
      this.registerPlayer();
    });
    this.playerName = document.createElement("input");
    this.playerName.placeholder = "Enter your name...";
    Object.assign(this.playerName.style, {
      position: "absolute",
      top: "calc(50% - 110px)",
      left: "calc(50% - 122px)",
      width: "200px",
      height: "40px",
      padding: "10px",
      "background-color": "white",
      "border-radius": "10px",
      "border-style": "solid",
      "border-color": "skyblue",
      color: "black",
      "font-weight": 800
    });
    this.gameTitle = document.createElement('h1');
    Object.assign(this.gameTitle.style, {
      position: "absolute",
      top: "calc(50% - 202px)",
      left: "calc(50% - 208px)",
      color: "white",
      "font-weight": 800,
      "font-family": 'Orbitron'
    });
    this.gameTitle.innerHTML = 'Asteroid Battlegrounds';

    const canvasContainer = document.getElementById("container");
    if (canvasContainer) {
      canvasContainer.appendChild(this.gameTitle);
      canvasContainer.appendChild(this.playerName);
      canvasContainer.appendChild(this.submitButton);
    }
  }

  createVideo() {
    this.movieTexture = this.textures.createCanvas(
      "registerMovie",
      CLIENT_WIDTH,
      CLIENT_HEIGHT
    );
    this.movieFrame = this.add
      .image(CLIENT_WIDTH / 2, CLIENT_HEIGHT / 2, "registerMovie")
      .setInteractive();
    this.video = document.createElement("video");
    this.video.src = "assets/videos/register-loop-3.mp4";
    const game = this;
    this.video.addEventListener("loadeddata", () => {
      this.playVideo();
    });
  }

  registerPlayer() {}

  goNextScene() {
    this.goToNextScene = true;
  }

  playVideo() {
    this.video.loop = true;
    this.video.play();
    const fps = 30;
    const loop = () => {
      if (!this.video.paused && !this.video.ended) {
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
  }
}
