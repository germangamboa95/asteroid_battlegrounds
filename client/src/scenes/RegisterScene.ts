import { Scene } from "phaser";
import * as Colyseus from "colyseus.js";
import { CLIENT_HEIGHT, CLIENT_WIDTH } from "../index";
import { MapSchema } from "@colyseus/schema";

const MAX_PLAYERS = 1;

export class RegisterScene extends Scene {
  protected register_music: Phaser.Sound.BaseSound;
  private movieFrame: Phaser.GameObjects.Image;
  private movieTexture: Phaser.Textures.CanvasTexture;
  private video: HTMLVideoElement;
  private submitButton: HTMLButtonElement;
  private playerName: HTMLInputElement;
  private gameTitle: HTMLElement;
  private playerIcons: HTMLDivElement;
  private goToNextScene: boolean = false;
  private loopTimeout;
  private room: Colyseus.Room = null;

  public constructor() {
    super({ key: "RegisterScene" });
  }

  public preload() {
    // Load assets here
    this.load.audio("register_music", "assets/audio/music/register.mp3");
    this.sound.pauseOnBlur = false;
  }

  public create() {
    // Construct world
    this.register_music = this.sound.add("register_music", { loop: true, volume: .7  });
    this.register_music.play();
    this.createForm();
    this.createVideo();
  }

  update() {
    if (this.goToNextScene) {
      this.goToNextScene = false;
      if (this.loopTimeout) {
        clearTimeout(this.loopTimeout);
      }
      // Remove looping background video
      this.movieFrame.destroy();
      this.movieTexture.destroy();
      this.video.remove();
      // Remove DOM Overlay
      this.gameTitle.remove();
      this.playerName.remove();
      this.submitButton.remove();
      if (this.playerIcons) {
        this.playerIcons.remove();
      }
      this.room.removeAllListeners();
      this.register_music.destroy();
      this.video.remove();      
      this.scene.start("MainGame", { room: this.room });
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
    this.gameTitle = document.createElement("h1");
    Object.assign(this.gameTitle.style, {
      position: "absolute",
      top: "calc(50% - 202px)",
      left: "calc(50% - 208px)",
      color: "white",
      "font-weight": 800,
      "font-family": "Orbitron"
    });
    this.gameTitle.innerHTML = "Asteroid Battlegrounds";
    this.toggleForm(true);
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
      this.toggleForm(false);
      this.playVideo();
    });
  }

  async registerPlayer() {
    const name = this.playerName.value;
    const connection = await new Colyseus.Client("ws://localhost:2567");
    this.room = await connection.joinOrCreate("game", { name });
    this.showLobby();
    this.room.onStateChange(state => {
      const players = Object.keys(state.players).map(key => state.players[key]);
      if (players.length === MAX_PLAYERS) {
        this.goToNextScene = true;
      } else if (!this.goToNextScene) {
        this.updateLobby(players);
      }
    });
  }

  showLobby() {
    this.gameTitle.innerHTML = "Waiting for Players...";
    this.playerName.hidden = true;
    this.submitButton.hidden = true;
    this.updateLobby([{ name: this.playerName.value }]);
  }

  addPlayerIcon(name: string) {
    const icon = document.createElement("div");
    Object.assign(icon.style, {
      "margin-bottom": "1em"
    });
    icon.innerHTML = "👨‍🚀 " + name;
    document.getElementById("playerIcons").appendChild(icon);
  }

  updateLobby(players: Array<any>) {
    if (this.playerIcons) {
      this.playerIcons.remove();
    }
    this.playerIcons = document.createElement("div");
    this.playerIcons.id = "playerIcons";
    Object.assign(this.playerIcons.style, {
      position: "absolute",
      display: "flex",
      top: "calc(50% - 128px)",
      left: "calc(50% - 208px)",
      color: 'white',
      'flex-flow': 'column nowrap',
      'font-family': 'Open Sans',
      'font-size': '30px'
    });
    document.getElementById("container").appendChild(this.playerIcons);
    players.forEach(player => {
      this.addPlayerIcon(player.name);
    });
  }

  toggleForm(hidden: boolean) {
    this.gameTitle.hidden = hidden;
    this.playerName.hidden = hidden;
    this.submitButton.hidden = hidden;
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
