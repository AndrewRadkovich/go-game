'use strict';

const EventBus = require('../src/eventbus').EventBus;
const surroundedExperimantal = require('../src/rule').surroundedExperimantal;
const assert = require('chai').assert;

describe("Rules (experimantal)", () => {
  it("It should find all stones that need to be removed", () => {
    const eventbus = new EventBus();
    let clusters = {
      "black": [
        {
          closed: true,
          stones: [
            { x: 4, y: [4] }
          ]
        },
        {
          closed: true,
          stones: [
            { x: 0, y: [2] },
            { x: 1, y: [1, 3] },
            { x: 2, y: [1, 3] },
            { x: 3, y: [2] }
          ]
        }
      ],
      "white": [
        {
          closed: true,
          stones: [
            { x: 3, y: [1, 4] },
            { x: 4, y: [2, 3, 5] },
            { x: 5, y: [1, 2, 3, 4, 5] },
            { x: 6, y: [3, 6] },
            { x: 7, y: [3, 4, 5] }
          ]
        }
      ]
    }

    let clustersExpected = {
      "black": [
        {
          closed: true,
          stones: [
            { x: 0, y: [2] },
            { x: 1, y: [1, 3] },
            { x: 2, y: [1, 3] },
            { x: 3, y: [2] }
          ]
        }
      ],
      "white": [
        {
          closed: true,
          stones: [
            { x: 3, y: [1, 4] },
            { x: 4, y: [2, 3, 5] },
            { x: 5, y: [1, 2, 3, 4, 5] },
            { x: 6, y: [3, 6] },
            { x: 7, y: [3, 4, 5] }
          ]
        }
      ]
    }

    assert.deepEqual(clustersExpected, surroundedExperimantal(clusters, eventbus));
  });
});