import * as Colyseus from "colyseus.js";

let client: Colyseus.Client = new Colyseus.Client("ws://localhost:2567");

client
  .joinOrCreate("chat")
  .then((room: Colyseus.Room) => {
    console.log(room.state);
  })
  .catch(e => {
    console.log("JOIN ERROR", e);
  });
