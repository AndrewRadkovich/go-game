'use strict';

const EventBus = require('../src/eventbus').EventBus;
const Board = require('../src/board').Board;
const Game = require('../src/game').Game;
const assert = require('chai').assert;

describe("Game", () => {
  it("player has been switched after move", () => {

    const eventbus = new EventBus();
    const board = new Board(19, eventbus);
    let game = new Game(board, eventbus).init();

    let stone = { x: 1, y: 1, color: 'black' };

    assert.equal("black", game.currentPlayerColor);
    eventbus.publish("player.made.a.move", stone);
    assert.equal("white", game.currentPlayerColor);
  });

  it("should create one cluster of single black stone after first move", () => {

    const eventbus = new EventBus();
    const board = new Board(19, eventbus);
    let game = new Game(board, eventbus).init();

    let stone = { x: 1, y: 1, color: 'black' };

    eventbus.publish("player.made.a.move", stone);
    assert.equal(game.stoneClusters[stone.color].length, 1);
    assert.equal(game.stoneClusters[stone.color][0].length, 1);
    assert.deepEqual(game.stoneClusters[stone.color][0][0], { x: 1, y: 1 });
  });

  it("should create two clusters each with one stone", () => {

    const eventbus = new EventBus();
    const board = new Board(19, eventbus);
    let game = new Game(board, eventbus).init();

    let stone1 = { x: 1, y: 1, color: 'black' };
    let stone2 = { x: 0, y: 1, color: 'white' };
    let stone3 = { x: 0, y: 0, color: 'black' };
    let stone4 = { x: 3, y: 3, color: 'black' };

    eventbus.publish("player.made.a.move", stone1);
    assert.equal(game.stoneClusters['black'].length, 1);
    assert.equal(game.stoneClusters['white'].length, 0);
    assert.deepEqual(game.stoneClusters['black'][0][0], { x: 1, y: 1 });

    eventbus.publish("player.made.a.move", stone2);
    assert.equal(game.stoneClusters['white'].length, 1);
    assert.deepEqual(game.stoneClusters['white'][0][0], { x: 0, y: 1 });

    eventbus.publish("player.made.a.move", stone3);
    assert.equal(game.stoneClusters['black'].length, 1);
    assert.equal(game.stoneClusters['black'][0].length, 2);
    assert.deepEqual(game.stoneClusters['black'][0][0], { x: 1, y: 1 });
    assert.deepEqual(game.stoneClusters['black'][0][1], { x: 0, y: 0 });

    eventbus.publish("player.made.a.move", stone4);
    assert.equal(game.stoneClusters['black'].length, 2);
    assert.equal(game.stoneClusters['black'][0].length, 2);
    assert.equal(game.stoneClusters['black'][1].length, 1);
    assert.deepEqual(game.stoneClusters['black'][1][0], { x: 3, y: 3 });
  });

  it("It create should one cluster", () => {

    const eventbus = new EventBus();
    const board = new Board(19, eventbus);
    const game = new Game(board, eventbus).init();

    board.placeStone({ x: 1, y: 1 }, "white");
    assert.equal(1, game.stoneClusters["white"].length);
  });

  it("It should create 2 clusters", () => {

    const eventbus = new EventBus();
    const board = new Board(19, eventbus);
    const game = new Game(board, eventbus).init();

    board.placeStone({ x: 1, y: 1 }, "white");
    board.placeStone({ x: 3, y: 3 }, "white");
    assert.equal(2, game.stoneClusters["white"].length);
  });

  it("It should merge two stone clusters in one after they are connected", () => {

    const eventbus = new EventBus();
    const board = new Board(19, eventbus);
    const game = new Game(board, eventbus).init();

    board.placeStone({ x: 1, y: 1 }, "white");
    board.placeStone({ x: 1, y: 3 }, "white");
    assert.equal(2, game.stoneClusters["white"].length);

    board.placeStone({ x: 1, y: 2 }, "white");
    assert.equal(1, game.stoneClusters["white"].length);
  });
});