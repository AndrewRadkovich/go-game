'use strict';

const EventBus = require('../src/eventbus').EventBus;
const Painter = require('../src/painter').Painter;
const assert = require('chai').assert;

describe("Painter", () => {
  it("It should convert real coordinates to their internal representation", () => {
    const eventbus = new EventBus();
    const painter = new Painter(eventbus, 40, null);
    painter.cellWidth = 50;

    const point = {x: 90, y: 90};
    const expectedPoint = {x: 1, y: 1};

    assert.deepEqual(expectedPoint, painter.fromRealToSimple(point));
  });

  it("their , It should convert real coordinates tinternal representation", () => {
    const eventbus = new EventBus();
    const painter = new Painter(eventbus, 10, null);
    painter.cellWidth = 50;

    const point = {x: 20, y: 20};
    const expectedPoint = {x: 0, y: 0};

    assert.deepEqual(expectedPoint, painter.fromRealToSimple(point));
  });
});
