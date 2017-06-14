'use strict';

class Event {

  constructor(name) {
    this.name = name;
    this.handlers = [];
  }

  registerHandler(handler) {
    this.handlers.push(handler);
  }
}

class RequestResponse {
  constructor(address) {
    this.address = address;
    this.handler = function (payload) {
      console.log("Default reply for \"" + address + "\"");
    }
  }

  registerHandler(handler) {
    this.handler = handler;
  }
}

class EventBus {

  constructor() {
    this.events = {};
    this.reqres = {};
    this.bridges = [];
    this.logEnabled = false;
  }

  attach(component) {
    component.wireTo(this);
    return this;
  }

  registeredEvents() {
    for (let pr in this.events) {
      console.log(pr);
    }
  }

  logD(eventName, payload) {
    console.log(eventName, JSON.stringify(payload, null, 2));
  }

  logW(message) {
    if(this.logEnabled) {
      console.log("WARN :: " + message);
    }
  }

  on(eventName, handler) {
    const event = this.events[eventName];
    if (event === undefined) this.events[eventName] = new Event(eventName);
    this.events[eventName].registerHandler(handler);
    return this;
  }

  publish(eventName, payload) {
    if (this.logEnabled) this.logD(eventName, payload);
    const event = this.events[eventName];
    const existence = {
      "true": () => this.logW("No event has been registered with name \"" + eventName + "\""),
      "false": () => event.handlers.forEach((handler) => handler(JSON.parse(JSON.stringify(payload))))
    };
    for (let i = 0; i < this.bridges; i++) {
      this.bridges[i].publishRemote(eventName, JSON.parse(JSON.stringify(payload)));
    }
    existence[String(!event)]();
  }

  recieve(address, handler) {
    const reqres = this.reqres[address];
    if (reqres === undefined) {
      this.reqres[address] = new RequestResponse(address);
    } else {
      this.logW("Handler has been already registered for \"" + address + "\"");
      return this;
    }
    this.reqres[address].registerHandler(handler);
    return this;
  }

  send(address, payload) {
    if (this.logEnabled) this.logD(address, payload);
    const reqres = this.reqres[address];
    if (reqres === undefined) {
      this.logW("No handler has been registered for \"" + address + "\", return {}");
      return {};
    } else {
      return reqres.handler(payload);
    }
  }
}

module.exports.EventBus = EventBus;