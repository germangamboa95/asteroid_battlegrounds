import { JSDOM } from "jsdom";
// @ts-ignore
import DataUri from "datauri";
import path from "path";

const datauri = new DataUri();

export function setupAuthoritativePhaser(room: any) {
  JSDOM.fromFile(path.join(__dirname, "./../../dist/index.html"), {
    // To run the scripts in the html file
    runScripts: "dangerously",
    // Also load supported external resources
    resources: "usable",
    // So requestAnimatinFrame events fire
    pretendToBeVisual: true,
    url: "http://localhost:2567"
  })
    .then(dom => {
      // @ts-ignore
      dom.window.gameLoaded = () => {
        console.log("Game is loaded");
      };
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
      dom.window.room = room;
    })
    .catch(error => {
      console.log(error.message);
    });
}
