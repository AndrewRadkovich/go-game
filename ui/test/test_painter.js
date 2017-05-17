'use strict';

const Painter = require('../src/painter').Painter;
const assert = require('chai').assert;

describe("Painter", () => {
  it("It should convert real coordinates to their internal representation", () => {
    const margin = 40;
    const painter = new Painter(margin, null);
    painter.board = {
      cellNum: 19
    };
    painter.cellWidth = margin * 2;

    const point = {x: 150, y: 150};
    const expectedPoint = {x: 1, y: 1};

    assert.deepEqual(expectedPoint, painter.fromRealToSimple(point));
  });

  it("It should convert real coordinates to internal representation", () => {
    const margin = 25;
    const painter = new Painter(margin, null);
    painter.board = {
      cellNum: 19
    };
    painter.cellWidth = margin * 2;

    const point = {x: margin, y: margin};
    const expectedPoint = {x: 0, y: 0};

    assert.deepEqual(expectedPoint, painter.fromRealToSimple(point));
  });

  it("It should convert real coordinates to internal representation", () => {
    const margin = 25;
    const painter = new Painter(margin, null);
    painter.board = {
      cellNum: 19
    };
    painter.cellWidth = margin * 2;

    const point = {x: margin * 2 - 1, y: margin * 2 - 1};
    const expectedPoint = {x: 0, y: 0};

    assert.deepEqual(expectedPoint, painter.fromRealToSimple(point));
  });

  it("It should convert real coordinates to internal representation", () => {
    const margin = 10;
    const cellWidth = margin * 2;
    const cellNum = 19;
    const painter = new Painter(margin, null);
    painter.board = {cellNum: cellNum};
    painter.cellWidth = cellWidth;

    const point = {x: 4 * cellWidth + 5, y: 3 * cellWidth + 4};
    const expectedPoint = {x: 4, y: 3};

    assert.deepEqual(expectedPoint, painter.fromRealToSimple(point));
  });

  it("It should convert real coordinates to internal representation", () => {
    const margin = 25;
    const cellWidth = margin * 2;
    const cellNum = 19;
    const painter = new Painter(margin, null);
    painter.board = {cellNum: cellNum};
    painter.cellWidth = cellWidth;

    const point = {x: 2 * cellWidth + 10, y: 3 * cellWidth};
    const expectedPoint = {x: 2, y: 3};

    assert.deepEqual(expectedPoint, painter.fromRealToSimple(point));
  });
});
