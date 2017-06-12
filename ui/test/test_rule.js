'use strict';

const EventBus = require('../src/eventbus').EventBus;
const surroundedExperimantal = require('../src/rule').surroundedExperimantal;
const searchSuspiciousPoints = require('../src/rule').searchSuspiciousPoints;
const findSurrounded = require('../src/rule').findSurrounded;
const assert = require('chai').assert;

describe("Rules (experimantal)", () => {
  it("It should find all stones that need to be removed", () => {
    const eventbus = new EventBus();
    let clusters = {
      "black": [
        {
          stones: [
            { x: 4, y: [4] }
          ]
        },
        {
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
          stones: [
            { x: 3, y: [1, 4] },
            { x: 4, y: [2, 3, 5] },
            { x: 5, y: [1, 2, 3, 4, 5] },
            { x: 6, y: [3, 6] },
            { x: 7, y: [3, 4, 5] }
          ]
        }
      ]
    };

    let clustersExpected = {
      "black": [
        {
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
          stones: [
            { x: 3, y: [1, 4] },
            { x: 4, y: [2, 3, 5] },
            { x: 5, y: [1, 2, 3, 4, 5] },
            { x: 6, y: [3, 6] },
            { x: 7, y: [3, 4, 5] }
          ]
        }
      ]
    };

    assert.deepEqual(clustersExpected, surroundedExperimantal(clusters, eventbus));
  });

  it("It should find suspicious points inside cluster", () => {
    let clusters = {
      "black": [
        {
          stones: [
            { x: 1, y: [2] },
            { x: 2, y: [1, 3] },
            { x: 3, y: [2] }
          ]
        }
      ],
      "white": []
    };

    let suspiciousPoints = searchSuspiciousPoints(clusters["black"][0]);
    assert.deepEqual(suspiciousPoints, [{ x: 2, y: [2] }]);
  });

  it("It should find suspicious points inside cluster", () => {
    let clusters = {
      "black": [
        {
          stones: [
            { x: 0, y: [3] },
            { x: 1, y: [1, 2, 4] },
            { x: 2, y: [1, 4] },
            { x: 3, y: [1, 2, 4] },
            { x: 4, y: [4] }
          ]
        }
      ],
      "white": []
    };

    let suspiciousPoints = searchSuspiciousPoints(clusters["black"][0]);
    assert.deepEqual(suspiciousPoints, [
      { x: 1, y: [3] },
      { x: 2, y: [2, 3] },
      { x: 3, y: [3] }
    ]);
  });

  /**
 *    0 1 2 3 4 5 6 7
 * 0|
 * 1|   B B B  
 * 2|   B x B
 * 3| B
 * 4|   B B B B
 * 5|   B   B
 * 6|     B
 */
  it("It should find suspicious points inside cluster", () => {
    let clusters = {
      "black": [
        {
          stones: [
            { x: 0, y: [3] },
            { x: 1, y: [1, 2, 4, 5] },
            { x: 2, y: [1, 4, 6] },
            { x: 3, y: [1, 2, 4, 5] },
            { x: 4, y: [4] }
          ]
        }
      ],
      "white": []
    };

    let suspiciousPoints = searchSuspiciousPoints(clusters["black"][0]);
    assert.deepEqual(suspiciousPoints, [
      { x: 1, y: [3] },
      { x: 2, y: [2, 3] },
      { x: 2, y: [5] },
      { x: 3, y: [3] }
    ]);
  });

  it("It should find suspicious points inside cluster", () => {
    let clusters = {
      "black": [
        {
          stones: [
            { x: 0, y: [1] },
            { x: 1, y: [0] }
          ]
        }
      ],
      "white": []
    };

    let suspiciousPoints = searchSuspiciousPoints(clusters["black"][0]);
    assert.deepEqual(suspiciousPoints, [
      { x: 0, y: [0] }
    ]);
  });

  /**
 *    0 1 2 3 4
 * 0|
 * 1|     B
 * 2|   B W B
 * 3|     B
 * 4|
 */
  it("It should find surrounded points", () => {
    let clusters = {
      "black": [
        {
          stones: [
            { x: 1, y: [2] },
            { x: 2, y: [1, 3] },
            { x: 3, y: [2] }
          ]
        }
      ],
      "white": [
        {
          stones: [
            { x: 2, y: [2] }
          ]
        }
      ]
    };

    let surrounded = findSurrounded(clusters);
    assert.deepEqual(surrounded, [{ x: 2, y: [2] }]);
  });

  /**
 *    0 1 2 3 4
 * 0|
 * 1|     B W
 * 2|   B W B
 * 3|     B
 * 4|
 */
  it("It should find surrounded points", () => {
    let clusters = {
      "black": [
        {
          stones: [
            { x: 1, y: [2] },
            { x: 2, y: [1, 3] },
            { x: 3, y: [2] }
          ]
        }
      ],
      "white": [
        {
          stones: [
            { x: 2, y: [2] },
            { x: 1, y: [3] }
          ]
        }
      ]
    };

    let surrounded = findSurrounded(clusters);
    assert.deepEqual(surrounded, [{ x: 2, y: [2, 3] }]);
  });

  /**
*    0 1 2 3 4
* 0|
* 1|     B B W
* 2|   B W W B
* 3|     B B
* 4|
*/
  it("It should find surrounded points", () => {
    let clusters = {
      "black": [
        {
          stones: [
            { x: 1, y: [2, 3] },
            { x: 2, y: [1, 4] },
            { x: 3, y: [2, 3] }
          ]
        }
      ],
      "white": [
        {
          stones: [
            { x: 2, y: [2, 3] },
            { x: 1, y: [4] }
          ]
        }
      ]
    };

    let surrounded = findSurrounded(clusters);
    assert.deepEqual(surrounded, [{ x: 2, y: [2, 3] }]);
  });
});
