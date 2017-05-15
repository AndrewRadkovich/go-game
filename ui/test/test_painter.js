'use strict';

const EventBus = require('../src/eventbus').EventBus;
const Painter = require('../src/painter').Painter;
const assert = require('chai').assert;

describe("Painter", () => {
  it("It should convert real coordinates to their internal representation", () => {
    const painter = new Painter(40, null);
    painter.board = {
      cellNum: 19
    };
    painter.cellWidth = 50;
    new EventBus().attach(painter);

    const point = {x: 90, y: 90};
    const expectedPoint = {x: 1, y: 1};

    assert.deepEqual(expectedPoint, painter.fromRealToSimple(point));
  });

  it("It should convert real coordinates to internal representation", () => {
    const painter = new Painter(10, null);
    painter.board = {
      cellNum: 19
    };
    painter.cellWidth = 50;
    new EventBus().attach(painter);

    const point = {x: 20, y: 20};
    const expectedPoint = {x: 0, y: 0};

    assert.deepEqual(expectedPoint, painter.fromRealToSimple(point));
  });

  it("It should convert real coordinates to internal representation", () => {
    const margin = 50;
    const painter = new Painter(margin, null);
    painter.board = {
      cellNum: 19
    };
    painter.cellWidth = 50;
    new EventBus().attach(painter);

    const point = {x: 20, y: 20};
    const expectedPoint = {x: 0, y: 0};

    assert.deepEqual(expectedPoint, painter.fromRealToSimple(point));
  });

  it("It should convert real coordinates to internal representation", () => {
    const margin = 50;
    const painter = new Painter(margin, null);
    painter.board = {
      cellNum: 19
    };
    painter.cellWidth = 50;
    new EventBus().attach(painter);

    const point = {x: 20, y: 20};
    const expectedPoint = {x: 0, y: 0};

    assert.deepEqual(expectedPoint, painter.fromRealToSimple(point));
  });
});
