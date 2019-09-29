"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const colyseus_1 = require("colyseus");
const schema_1 = require("@colyseus/schema");
const nodeboot_1 = require("./nodeboot");
class Player extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.x = Math.ceil(Math.random() * 500);
        this.y = Math.ceil(Math.random() * 500);
    }
}
__decorate([
    schema_1.type("number")
], Player.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "y", void 0);
class PlayerMap extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
    }
}
__decorate([
    schema_1.type({ map: Player })
], PlayerMap.prototype, "players", void 0);
class State extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
        this.something = "This attribute won't be sent to the client-side";
    }
    createPlayer(id) {
        this.players[id] = new Player();
    }
    removePlayer(id) {
        delete this.players[id];
    }
    movePlayer(id, movement) {
        console.log(movement);
        if (movement.x) {
            this.players[id].x += movement.x;
        }
        else if (movement.y) {
            this.players[id].y += movement.y;
        }
    }
}
__decorate([
    schema_1.type({ map: Player })
], State.prototype, "players", void 0);
exports.State = State;
class GameRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 4;
    }
    onCreate(options) {
        this.setState(new State());
        let self = this;
        nodeboot_1.setupAuthoritativePhaser(self);
    }
    onJoin(client, options) {
        console.log("someone joined", options);
        this.state.createPlayer(client.sessionId);
    }
    onMessage(client, message) {
        console.log("StateHandlerRoom received message from", client.sessionId, ":", message);
        this.state.movePlayer(client.sessionId, message);
    }
    onLeave(client, consented) {
        this.state.removePlayer(client.sessionId);
    }
    onDispose() {
        console.log("Dispose StateHandlerRoom");
    }
}
exports.GameRoom = GameRoom;
