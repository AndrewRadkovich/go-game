'use strict';

const EventBus = require('../src/eventbus').EventBus;
const Board = require('../src/board').Board;
const assert = require('chai').assert;

describe("Board", () => {
  it("is busy place", () => {
    let board = new Board(500, 5);
    board.busyPlaces = ['20:23', '11:23', '32:32']

    assert.isFalse(board.isNotBusyPlace(20, 23));
    assert.isFalse(board.isNotBusyPlace(11, 23));
    assert.isFalse(board.isNotBusyPlace(32, 32));
    assert.isTrue(board.isNotBusyPlace(20, 245));
  });
});