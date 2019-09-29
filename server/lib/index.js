"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const colyseus_1 = require("colyseus");
const monitor_1 = require("@colyseus/monitor");
// import socialRoutes from "@colyseus/social/express"
const path_1 = __importDefault(require("path"));
const GameRoom_1 = require("./network/GameRoom");
const parcel_bundler_1 = __importDefault(require("parcel-bundler"));
const port = Number(process.env.PORT || 2567);
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../dist")));
const server = http_1.default.createServer(app);
const gameServer = new colyseus_1.Server({
    server,
    express: app
});
gameServer.define("game", GameRoom_1.GameRoom);
app.use("/colyseus", monitor_1.monitor(gameServer));
const bundler = new parcel_bundler_1.default(path_1.default.resolve(__dirname, "../src/game/index.html"));
app.use(bundler.middleware());
gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
