'use strict';

class Logger {
  constructor() {
    this.eventbus = {};
  }

  init() {
    this.eventbus.on('log.debug', (payload) => {
      deepDebugM(payload[0], payload[1], payload[2]);
    });
  }

  deepDebugM(marker, obj, space) {
    console.log(marker + " :: " + JSON.stringify(obj, null, space));
  }

  deepDebug(obj, space) {
    deepDebugM("", obj, space);
  }
}