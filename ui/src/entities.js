'use strict';

class Clusters {
  constructor() {
    this.clusters = {
      "black": [],
      "white": []
    }
  }

  of(color) {
    return this.clusters[color];
  }

  add(stone) {
    let mergedCluster = {
      stones: []
    };
    let clusteIndexesToMerge = [];
    let clusters = this.clusters[stone.color];
    clusters.push({
      stones: [{ x: stone.x, y: stone.y }]
    });
    for (let i = 0; i < clusters.length; i++) {
      let cluster = clusters[i];
      for (let j = 0; j < cluster.stones.length; j++) {
        if (Clusters.nearby(stone, cluster.stones[j])) {
          mergedCluster.stones = mergedCluster.stones.concat(cluster.stones);
          clusteIndexesToMerge.push(i);
          break;
        }
      }
    }
    for (let i = 0; i < clusteIndexesToMerge.length; i++) {
      clusters.splice(clusteIndexesToMerge[i] - i, 1);
    }
    clusters.push(mergedCluster);
  }

  static nearby(stone1, stone2) {
    let dX = Math.abs(stone1.x - stone2.x);
    let dY = Math.abs(stone1.y - stone2.y);
    return (dX === 1 && (dY === 0 || dY === 1)) || dX === 0 && (dY === 0 || dY === 1);
  }
}

exports.Clusters = Clusters;