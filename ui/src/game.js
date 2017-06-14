'use strict';

import log from "./utils";

class Game {
  constructor(board) {
    this.board = board;
    this.stoneClusters = {
      "black": [],
      "white": []
    };
    this.currentPlayerColor = 'black';
    this.moveTransition = {
      "black": "white",
      "white": "black"
    };
    this.rules = [];
  }

  wireTo(eventbus) {
    this.eventbus = eventbus;
    this.eventbus.on('game.start', (e) => {
      this.start();
    });
    this.eventbus.on('board.clicked', (e) => {
      let realCoords = { x: e.layerX, y: e.layerY };
      let internalCoordinates = this.eventbus.send("real.coordinates.to.internal", realCoords);
      log("internalCoordinates", internalCoordinates);
      log("real Coordinates", realCoords);
      this.board.placeStone(internalCoordinates, this.currentPlayerColor);
    });
    this.eventbus.on('player.made.a.move', (stone) => {
      this.addStoneToCluster(stone);
      this.switchPlayer();
      // this.stoneClusters = this.eventbus.send('rules.perform', this.stoneClusters);
    });
    this.eventbus.on('notify.player', (payload) => {
      console.log(payload);
    });
    return this;
  }

  addStoneToCluster(stone) {
    let mergedCluster = {
      stones: []
    };
    let clusteIndexesToMerge = [];
    let clusters = this.stoneClusters[stone.color];
    clusters.push({
      stones: [{ x: stone.x, y: stone.y }]
    });
    for (let i = 0; i < clusters.length; i++) {
      let cluster = clusters[i];
      for (let j = 0; j < cluster.stones.length; j++) {
        if (Game.nearby(stone, cluster.stones[j])) {
          mergedCluster.stones = mergedCluster.stones.concat(cluster.stones);
          clusteIndexesToMerge.push(i);
          break;
        }
      }
    }
    for (let i = 0; i < clusteIndexesToMerge.length; i++) {
      clusters.splice(clusteIndexesToMerge[i] - i, 1);
    }
    clusters.push(mergedCluster);
    this.eventbus.publish('log.debug', ["clusters", this.stoneClusters, 2]);
  }

  static nearby(stone1, stone2) {
    let dX = Math.abs(stone1.x - stone2.x);
    let dY = Math.abs(stone1.y - stone2.y);
    return (dX === 1 && (dY === 0 || dY === 1)) || dX === 0 && (dY === 0 || dY === 1);
  }

  opponentColor() {
    return this.moveTransition[this.currentPlayerColor];
  }

  switchPlayer() {
    this.currentPlayerColor = this.opponentColor();
  }

  start() {
    this.eventbus.publish('game.started', this.board);
  }
}

module.exports.Game = Game;