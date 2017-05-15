'use strict';

function deepDebugM(marker, obj, space) {
  console.log(marker + " :: " + JSON.stringify(obj, null, space));
}

function deepDebug(obj, space) {
  deepDebugM("", obj, space);
}

const opponent = {
  "black": "white",
  "white": "black"
};

const surroundedExperimantal = (clusters, eventbus) => {
  const clustersCopy = JSON.parse(JSON.stringify(clusters));
  ["black", "white"].forEach((color) => {
    clusters[color]
      .filter(cluster => cluster.closed && cluster.stones.length > 2)
      .map(cluster => {
        let suspiciousPoints = searchSuspiciousPoints(cluster);
        clustersCopy[opponent[color]].forEach(opponentCluster => {
          suspiciousPoints.forEach(point => {
            opponentCluster.stones.forEach(row => {
              if (point.x === row.x) row.y = row.y.filter(value => point.y.indexOf(value) === -1);
            });
            opponentCluster.stones = opponentCluster.stones.filter(row => row.y.length !== 0);
          });
        });
        clustersCopy[opponent[color]] = clustersCopy[opponent[color]].filter(cluster => cluster.stones.length !== 0);
        return clustersCopy;
      });
  });
  return clustersCopy;
};

function searchSuspiciousPoints(cluster) {
  let suspiciousPoints = [];
  for (let index = 1; index < cluster.stones.length - 1; index++) {
    let row = cluster.stones[index];
    for (let i = 1; i < row.y.length; i++) {
      if (row.y[i] - row.y[i - 1] > 1) {
        suspiciousPoints.push({ x: row.x, y: range(row.y[i - 1], row.y[i]) });
      }
    }
  }
  return suspiciousPoints;
}

function range(from, to) {
  let array = [];
  for (let i = from + 1; i < to; i++) {
    array.push(i);
  }
  return array;
}

const hasEmptyCellsNearby = (stones, stone) => {
  let requiredAmountOfNeighbour = 4;
  if (stone.x === 0) requiredAmountOfNeighbour--;
  if (stone.y === 0) requiredAmountOfNeighbour--;
  let neighbourCounter = 0;
  for (let color of ["black", "white"]) {
    for (let i = 0; i < stones[color].length; i++) {
      for (let j = 0; j < stones[color][i].length; j++) {
        if (nearby(stones[color][i][j], stone)) {
          neighbourCounter++;
        }
      }
    }
  }
  return requiredAmountOfNeighbour > neighbourCounter;
};

const nearby = (stone1, stone2) => {
  let dX = Math.abs(stone1.x - stone2.x);
  let dY = Math.abs(stone1.y - stone2.y);
  let equal = dX === 0 && dY === 0;
  let d = dX === 1 && dY === 1;
  return !equal && !d && ((dX === 1 && (dY === 0 || dY === 1)) || dX === 0 && (dY === 0 || dY === 1));
};

exports.nearby = nearby;
exports.hasEmptyCellsNearby = hasEmptyCellsNearby;
exports.surroundedExperimantal = surroundedExperimantal;
exports.searchSuspiciousPoints = searchSuspiciousPoints;