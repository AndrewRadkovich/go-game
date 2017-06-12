'use strict';

const Clusters = require('../src/entities').Clusters;
const assert = require('chai').assert;

describe("Clusters", () => {
    it("stone is added to clusters correctly", () => {
        let clusters = new Clusters();
        let stones = [
            { x: 2, y: 2, color: "white" }
        ];

        for (let stone of stones) {
            clusters.add(stone);
        }

        let expected = [
            {
                stones: [{ x: 2, y: 2 }]
            }
        ];
        let actual = clusters.of("white");

        assert.deepEqual(expected, actual);
    });

    it("stone is added to clusters correctly", () => {
        let clusters = new Clusters();
        let stones = [
            { x: 2, y: 2, color: "white" },
            { x: 1, y: 2, color: "black" },
            { x: 2, y: 3, color: "white" },
            { x: 1, y: 3, color: "black" },
            { x: 4, y: 2, color: "white" },
            { x: 2, y: 4, color: "black" },
            { x: 5, y: 2, color: "white" }
        ];

        for (let stone of stones) {
            clusters.add(stone);
        }

        let expectedWhite = [
            {
                stones: [
                    { x: 2, y: 2 },
                    { x: 2, y: 3 }
                ]
            },
            {
                stones: [
                    { x: 4, y: 2 },
                    { x: 5, y: 2 }
                ]
            }
        ];
        let actualWhite = clusters.of("white");

        assert.deepEqual(expectedWhite, actualWhite);
    });

    it("stone is added to clusters correctly", () => {
        let expected = {};
        let actual = {};
        assert.deepEqual(expected, actual);
    });
});
