'use strict';

const EventBus = require('../src/eventbus').EventBus;
const Board = require('../src/board').Board;
const Game = require('../src/game').Game;
const surrounded = require('../src/rule').surrounded;
const nearby = require('../src/rule').nearby;
const hasEmptyCellsNearby = require('../src/rule').hasEmptyCellsNearby;
const assert = require('chai').assert;

describe("Geometry", () => {
  /**
   *    0 1 2 3 4
   * 0|
   * 1| o x
   * 2|
   * 3|
   * 4|
   */
  it("check neighbours #top", () => {
    let stone1 = { x: 1, y: 1 };
    let stone2 = { x: 0, y: 1 };
    assert.isTrue(nearby(stone1, stone2));
  });

  /**
   *    0 1 2 3 4
   * 0|
   * 1| o x
   * 2|
   * 3|
   * 4|
   */
  it("check neighbours #botton", () => {
    let stone1 = { x: 0, y: 1 };
    let stone2 = { x: 1, y: 1 };
    assert.isTrue(nearby(stone1, stone2));
  });

  /**
   *    0 1 2 3 4
   * 0|   o
   * 1|   x
   * 2|
   * 3|
   * 4|
   */
  it("check neighbours #left", () => {
    let stone1 = { x: 1, y: 1 };
    let stone2 = { x: 1, y: 0 };
    assert.isTrue(nearby(stone1, stone2));
  });

  /**
   *    0 1 2 3 4
   * 0|   x
   * 1|   o
   * 2|
   * 3|
   * 4|
   */
  it("check neighbours #left", () => {
    let stone1 = { x: 1, y: 0 };
    let stone2 = { x: 1, y: 1 };
    assert.isTrue(nearby(stone1, stone2));
  });

  /**
   *    0 1 2 3 4
   * 0| x
   * 1|   o
   * 2|
   * 3|
   * 4|
   */
  it("check neighbours #diagonal", () => {
    let stone1 = { x: 1, y: 1 };
    let stone2 = { x: 0, y: 0 };
    assert.isFalse(nearby(stone1, stone2));
  });

  /**
   *    0 1 2 3 4
   * 0| 
   * 1|     o
   * 2|   x
   * 3|
   * 4|
   */
  it("check neighbours #diagonal 2", () => {
    let stone1 = { x: 1, y: 2 };
    let stone2 = { x: 2, y: 1 };
    assert.isFalse(nearby(stone1, stone2));
  });

  /**
   *    0 1 2 3 4
   * 0| x o
   * 1| o
   * 2|
   * 3|
   * 4|
   */
  it("hasEmptyCellsNearby #corner", () => {
    let stones = {
      "black": [[
        { x: 0, y: 0 }
      ]],
      "white": [[
        { x: 1, y: 0 },
        { x: 0, y: 1 }
      ]]
    };
    assert.isFalse(hasEmptyCellsNearby(stones, { x: 0, y: 0 }));
  });

  /**
   *    0 1 2 3 4
   * 0| x o
   * 1| o o
   * 2|
   * 3|
   * 4|
   */
  it("hasEmptyCellsNearby #corner #false", () => {
    let stones = {
      "black": [[
        { x: 0, y: 0 }
      ]],
      "white": [[
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
      ]]
    };
    assert.isFalse(hasEmptyCellsNearby(stones, { x: 0, y: 0 }));
  });

  /**
   *    0 1 2 3 4
   * 0| 
   * 1|     o
   * 2|   o x o
   * 3|     o
   * 4|
   */
  it("hasEmptyCellsNearby #ring", () => {
    let stones = {
      "black": [[
        { x: 2, y: 2 }
      ]],
      "white": [[
        { x: 2, y: 1 },
        { x: 3, y: 2 },
        { x: 2, y: 3 },
        { x: 1, y: 2 }
      ]]
    };
    assert.isFalse(hasEmptyCellsNearby(stones, { x: 2, y: 2 }));
  });

  /**
   *    0 1 2 3 4
   * 0|   o x o
   * 1|     o
   * 2|
   * 3|
   * 4|
   */
  it("hasEmptyCellsNearby #wall", () => {
    let stones = {
      "black": [[
        { x: 2, y: 0 }
      ]],
      "white": [[
        { x: 1, y: 0 },
        { x: 2, y: 1 },
        { x: 3, y: 0 }
      ]]
    };
    assert.isFalse(hasEmptyCellsNearby(stones, { x: 2, y: 0 }));
  });

  /**
   *    0 1 2 3 4
   * 0|   o x
   * 1|     o
   * 2|
   * 3|
   * 4|
   */
  it("hasEmptyCellsNearby #wall #false", () => {
    let stones = {
      "black": [[
        { x: 2, y: 0 }
      ]],
      "white": [[
        { x: 1, y: 0 },
        { x: 2, y: 1 }
      ]]
    };
    assert.isTrue(hasEmptyCellsNearby(stones, { x: 2, y: 0 }));
  });
});