import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
// import socialRoutes from "@colyseus/social/express"
import path from "path";
import { GameRoom } from "./network/GameRoom";

import Parcel from "parcel-bundler";

const port: number = Number(process.env.PORT || 2567);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../dist")));

const server = http.createServer(app);

const gameServer: Server = new Server({
  server,
  express: app
});

gameServer.define("game", GameRoom);

app.use("/colyseus", monitor(gameServer));

const bundler: Parcel = new Parcel(
  path.resolve(__dirname, "../src/game/index.html")
);

app.use(bundler.middleware());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
