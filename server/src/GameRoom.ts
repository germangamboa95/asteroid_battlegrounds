import { Room, Client } from "colyseus";
import { Schema, type } from "@colyseus/schema";
import { JSDOM } from "jsdom";
// @ts-ignore
import DataUri from "datauri";
import path from "path";

const datauri = new DataUri();

class MyCounter extends Schema {
  @type("number")
  counter: number = 0;
}

export class GameRoom extends Room {
  onCreate(options: any) {
    // Room was created instanciate new client-server
    setupAuthoritativePhaser();
  }

  onJoin(client: Client, options: any) {
    console.log("someone joined");
  }
  onMessage(client: Client, message: any) {}
  onLeave(client: Client, consented: boolean) {}
  onDispose() {}
}

function setupAuthoritativePhaser() {
  JSDOM.fromFile(path.join(__dirname, "./../dist/index.html"), {
    // To run the scripts in the html file
    runScripts: "dangerously",
    // Also load supported external resources
    resources: "usable",
    // So requestAnimatinFrame events fire
    pretendToBeVisual: true
  })
    .then(dom => {
      dom.window.URL.createObjectURL = blob => {
        if (blob) {
          return datauri.format(
            blob.type,
            blob[Object.getOwnPropertySymbols(blob)[0]]._buffer
          ).content;
        }
      };
      dom.window.URL.revokeObjectURL = objectURL => {};
      // @ts-ignore
      dom.window.gameLoaded = () => {
        console.log("Game is loaded");
      };
    })
    .catch(error => {
      console.log(error.message);
    });
}
