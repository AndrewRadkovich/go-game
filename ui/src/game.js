'use strict';

class Game {
  constructor(board, eventbus) {
    this.board = board;
    this.eventbus = eventbus;
    this.stoneClusters = {
      "black": [],
      "white": []
    }
    this.currentPlayerColor = 'black';
    this.moveTransition = {
      "black": "white",
      "white": "black"
    }
    this.rules = [];
  }

  withRules(rules) {
    console.log(JSON.stringify(rules));
    this.rules = rules;
    return this;
  }

  init() {
    this.eventbus.on('board.clicked', (e) => {
      let internalCoordinates = this.eventbus.send("real.coordinates.to.internal", { x: e.layerX, y: e.layerY });
      console.log(JSON.stringify(internalCoordinates));
      this.board.placeStone(internalCoordinates, this.currentPlayerColor)
    });
    this.eventbus.on('player.made.a.move', (stone) => {
      this.addStoneToCluster(stone);
      this.switchPlayer();
      this.performRules();
    });
    this.eventbus.on('notify.player', (payload) => {
      console.log(payload);
    });
    return this;
  }

  performRules() {
    let rules = this.rules;
    for (let i = 0; i < rules.length; i++) {
      rules[i](this.board, this.stoneClusters, this.eventbus);
    }
  }

  addStoneToCluster(stone) {
    let mergedCluster = [];
    let clusteIndexesToMerge = [];
    let clusters = this.stoneClusters[stone.color];
    clusters.push([{ x: stone.x, y: stone.y }]);
    for (let i = 0; i < clusters.length; i++) {
      let cluster = clusters[i];
      for (let j = 0; j < cluster.length; j++) {
        if (this.nearby(stone, cluster[j])) {
          mergedCluster = mergedCluster.concat(cluster);
          clusteIndexesToMerge.push(i);
          break;
        }
      }
    }
    for (let i = 0; i < clusteIndexesToMerge.length; i++) {
      clusters.splice(clusteIndexesToMerge[i] - i, 1);
    }
    clusters.push(mergedCluster);
  }

  nearby(stone1, stone2) {
    let dX = Math.abs(stone1.x - stone2.x);
    let dY = Math.abs(stone1.y - stone2.y);
    return (dX === 1 && (dY === 0 || dY === 1)) || dX === 0 && (dY === 0 || dY === 1);
  }

  opponentColor() {
    return this.moveTransition[this.currentPlayerColor];
  }

  switchPlayer() {
    this.currentPlayerColor = this.moveTransition[this.currentPlayerColor];
  }

  start() {
    this.eventbus.publish('game.started', this.board);
  }
}

exports.Game = Game;