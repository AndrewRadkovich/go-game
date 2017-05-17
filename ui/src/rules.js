'use strict';

class Rules {
  constructor() {
    this.opponent = {
      "black": "white",
      "white": "black"
    };
  }

  wireTo(eventbus) {
    this.eventbus = eventbus;
    this.eventbus.recieve('rules.perform', (clusters) => {
      // this.removeIfSurrounded(clusters);
      this.updateScore();
    });
  }

  removeIfSurrounded(clusters) {
    const clustersCopy = JSON.parse(JSON.stringify(clusters));
    ["black", "white"].forEach((color) => {
      clusters[color]
        .filter(cluster => cluster.stones.length > 2)
        .map(cluster => {
          let suspiciousPoints = Rules.searchSuspiciousPoints(cluster);
          clustersCopy[this.opponent[color]].forEach(opponentCluster => {
            suspiciousPoints.forEach(point => {
              opponentCluster.stones.forEach(row => {
                if (point.x === row.x) row.y = row.y.filter(value => point.y.indexOf(value) === -1);
              });
              opponentCluster.stones = opponentCluster.stones.filter(row => row.y.length !== 0);
            });
          });
          clustersCopy[this.opponent[color]] = clustersCopy[this.opponent[color]].filter(cluster => cluster.stones.length !== 0);
          return clustersCopy;
        });
    });
    return clustersCopy;
  };

  static searchSuspiciousPoints(cluster) {
    let suspiciousPoints = [];
    for (let index = 1; index < cluster.stones.length - 1; index++) {
      let row = cluster.stones[index];
      for (let i = 1; i < row.y.length; i++) {
        if (row.y[i] - row.y[i - 1] > 1) {
          suspiciousPoints.push({x: row.x, y: Rules.range(row.y[i - 1], row.y[i])});
        }
      }
    }
    return suspiciousPoints;
  }

  static range(from, to) {
    let array = [];
    for (let i = from + 1; i < to; i++) {
      array.push(i);
    }
    return array;
  }


  updateScore() {

  }
}