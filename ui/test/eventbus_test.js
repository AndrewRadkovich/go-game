'use strict'

const EventBus = require('../src/eventbus').EventBus;
const assert = require('chai').assert;

describe("EventBus", () => {

  console.log(JSON.stringify(EventBus, null, 2));

  it("It should execute one handler when event is fired", () => {
    var eventbus = new EventBus();
    var v = "";

    eventbus.on("event1", (payload) => {
      v = payload;
    });

    eventbus.on("event2", (payload) => {
      v = payload + payload;
    });

    eventbus.publish("event1", "payload");

    assert.equal(v, "payload");
  });

  it("It should execute all handlers when event is fired", () => {
    var eventbus = new EventBus();
    var v = "";

    eventbus.on("event", (payload) => {
      v += payload;
    });

    eventbus.on("event", (payload) => {
      v += payload;
    });

    eventbus.publish("event", "payload");

    assert.equal(v, "payloadpayload");
  });

  it("It should not throw exception when publish by firing unknown event", () => {
    var eventbus = new EventBus();

    eventbus.on("event1", (payload) => { });
    eventbus.on("event2", (payload) => { });
    eventbus.on("event3", (payload) => { });

    eventbus.publish("unknown", "payload");
  });

  it("It should not execute one handler one time", () => {
    var eventbus = new EventBus();
    eventbus.recieve("request.address", (payload) => {
      return payload + ".reply"
    });

    let reply = eventbus.send("request.address", "request");
    assert.equal(reply, "request.reply");
  });

  it("It should not allow you to create handler for existing address", () => {
    var eventbus = new EventBus();
    eventbus.recieve("request.address", (payload) => {
      return payload + ".reply"
    });

    eventbus.recieve("request.address", (payload) => {
      return payload + ".reply2"
    });

    let reply = eventbus.send("request.address", "request");
    assert.equal(reply, "request.reply");
  });

  it("It should not affect on payload when event has many handlers", () => {
    let eventbus = new EventBus();
    let body = {
      x: 10
    }

    eventbus.on("event1", (payload) => {
      payload.x += 1;
      assert.equal(payload.x, 11);
    });

    eventbus.on("event1", (payload) => {
      payload.x += 1;
      assert.equal(payload.x, 11);
    });

    eventbus.publish("event1", body);
  });

  it("It should not affect on payload when event has many handlers", () => {
    const eventbus = new EventBus();

    eventbus.on("event1", (one, two, three) => {
      console.log(one, two, three);
    });

    eventbus.publish("event1", [1, 2, 3]);
  });
});