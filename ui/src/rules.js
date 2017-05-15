'use strict';

class Rules {
  constructor() {

  }

  wireTo(eventbus) {
    this.eventbus = eventbus;
    this.eventbus.on('rules.perform', (board) => {
      this.removeIfSurrounded();
      this.updateScore();
    });
  }

  removeIfSurrounded() {

  }

  updateScore() {

  }
}