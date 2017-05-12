'use strict';

class Board {
  constructor(cellNum, margin, eventbus) {
    this.cellNum = cellNum;
    this.margin = margin;
    this.busyPlaces = [];
    this.eventbus = eventbus;
    this.stones = {
      "black": [],
      "white": []
    }
  }

  isNotBusyPlace(x, y) {
    return this.busyPlaces.indexOf(x + ':' + y) === -1;
  }

  placeStone(nearest, color) {
    if (this.isNotBusyPlace(nearest.x, nearest.y)) {
      this.busyPlaces.push(nearest.x + ':' + nearest.y);
      this.stones[color].push({
        x: nearest.x,
        y: nearest.y
      });
      this.eventbus.publish('player.made.a.move', {
        x: nearest.x,
        y: nearest.y,
        color: color
      });
    } else {
      this.eventbus.publish('notify.player', 'You cannot place stone here [' + nearest.x + ':' + nearest.y + ']');
    }
  }
}

exports.Board = Board;