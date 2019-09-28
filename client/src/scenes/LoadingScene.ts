import { Scene } from "phaser";
import {CLIENT_HEIGHT, CLIENT_WIDTH} from "../index";

export class LoadingScene extends Scene {
  private movieFrame: Phaser.GameObjects.Image
  private movieTexture: Phaser.Textures.CanvasTexture
  private video: HTMLVideoElement

  constructor() {
    super({ key: 'LoadingScene' })
  }

  preload() {
    this.load.image('background', '/assets/star_gold.png');
  }

  create() {
    this.movieTexture = this.textures.createCanvas('movie', CLIENT_WIDTH, CLIENT_HEIGHT)
    this.add.image(400, 300, 'background');
    // this.movieFrame = this.add.image(CLIENT_WIDTH / 2, CLIENT_HEIGHT / 2, 'movie').setInteractive()
    // this.video = document.createElement('video')
    // this.video.src = 'assets/videos/intro.mp4'
    // const game = this
    // this.video.addEventListener('loadeddata', function() {
    //   this.play()
    //   const fps = 30
    //   const loop = () => {
    //     if (!this.paused && !this.ended) {
    //       game.movieTexture.context.drawImage(this, 0, 0, CLIENT_WIDTH, CLIENT_HEIGHT)
    //       game.movieTexture.refresh()
    //       setTimeout(loop, 1000/fps)
    //     }
    //   }
    //   loop();
    // })
    // this.video.addEventListener('ended', function() {
    //   game.goNextScene()
    // })
    // this.video.addEventListener('pause', function() {
    //   game.goNextScene()
    // })
    // this.movieFrame.on('pointerdown', () => {
    //   this.video.pause()
    // })
  }

  goNextScene() {
    // this.video.remove()
    // this.movieTexture.destroy()
    this.scene.switch('RegisterScene')
  }

  update() {
  }
}