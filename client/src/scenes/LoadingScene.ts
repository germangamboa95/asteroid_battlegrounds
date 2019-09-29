import { Scene } from "phaser";
import { CLIENT_HEIGHT, CLIENT_WIDTH } from "../index";
import { EventEmitter } from "strong-events/lib";

export class LoadingScene extends Scene {
  private movieFrame: Phaser.GameObjects.Image;
  private movieTexture: Phaser.Textures.CanvasTexture
  private video: HTMLVideoElement
  private startButton: HTMLButtonElement
  private goToNextScene: boolean = false;
  private pointerEvent: EventEmitter;
  private loopTimeout;

  constructor() {
    super({ key: 'LoadingScene' })
  }

  preload() {
  }

  playVideo() {
    try {
      this.played = true;
      this.video.play()
      const fps = 30
      const loop = () => {
        if (!this.video.paused && !this.video.ended && !this.goToNextScene) {
          this.movieTexture.context.drawImage(this.video, 0, 0, CLIENT_WIDTH, CLIENT_HEIGHT)
          this.movieTexture.refresh()
          this.loopTimeout = setTimeout(loop, 1000 / fps)
        }
      }
      loop();
    } catch (e) {
      console.log(e.message)
    }
  }

  create() {
    this.movieTexture = this.textures.createCanvas('movie', CLIENT_WIDTH, CLIENT_HEIGHT)
    this.movieFrame = this.add.image(CLIENT_WIDTH / 2, CLIENT_HEIGHT / 2, 'movie').setInteractive()
    this.video = document.createElement('video')
    this.startButton = document.createElement('button')
    this.startButton.innerText = '🚀 Launch!'
    this.startButton.hidden = true;
    Object.assign(this.startButton.style, {
      position: 'absolute',
      top: 'calc(50% - 30px)',
      left: 'calc(50% - 110px)',
      width: '200px',
      height: '40px',
      padding: '10px',
      'background-color': 'white',
      'border-radius': '10px',
      'border-style': 'solid',
      'border-color': 'skyblue',
      color: 'red',
      'font-weight': 800
    });
    this.startButton.addEventListener('click', () => {
      this.startButton.remove();
      this.playVideo();
    });
    document.getElementById('container').appendChild(this.startButton);

    this.video.src = 'assets/videos/intro.mp4'
    const game = this
    this.video.addEventListener('loadeddata', () => {
      this.startButton.hidden = false;
    })
    this.video.addEventListener('ended', function () {
      game.nextScene()
    })
    this.video.addEventListener('pause', function () {
      game.nextScene()
    })
    this.pointerEvent = this.movieFrame.on('pointerdown', () => {
      this.video.pause()
    })
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
      this.scene.scene.events.on('destroy', () => {
        this.movieFrame.destroy();
        this.movieTexture.destroy();
        this.video.remove();
      });
      this.scene.start('RegisterScene');
    }
  }
}