'use strict';

class Painter {
  constructor(eventbus, canvas) {
    this.eventbus = eventbus;
    this.canvas = canvas;
    this.backgroundColor = "rgb(210,144,29)";
    this.stoneColors = {
      "black": ["#292929", "black"],
      "white": ["white", "gray"]
    }
  }

  init() {
    this.eventbus.on("vanish.stones", (stones) => {
      this.vanishStones(stones);
    });
    this.eventbus.on('player.made.a.move', (payload) => {
      this.drawStone(payload.x, payload.y, payload.color, payload.stoneRadius);
    });
    this.eventbus.on('game.started', (board) => {
      this.drawBoard(board);
    });
    this.eventbus.recieve("real.coordinates.to.internal", (pointReal) => {
      return this.fromRealToSimple(pointReal);
    });
    return this;
  }

  vanishStones(stones) {
    let ctx = this.canvas.getContext("2d");
    let lineCtx = this.canvas.getContext("2d");

    let stoneRadius = this.cellWidth * 0.47;

    for (let stone of stones) {
      let realPoint = this.fromSimpleToReal(stone.x, stone.y);

      let x = realPoint.x;
      let y = realPoint.y;

      ctx.beginPath();
      ctx.arc(x, y, stoneRadius, 2 * Math.PI, false);
      ctx.fillStyle = this.backgroundColor;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = this.backgroundColor;
      ctx.stroke();

      ctx.beginPath();
      lineCtx.moveTo(x, y - stoneRadius);
      lineCtx.lineTo(x, y + stoneRadius);
      lineCtx.moveTo(x - stoneRadius, y);
      lineCtx.lineTo(x + stoneRadius, y);
      lineCtx.strokeStyle = 'black';
      lineCtx.stroke();
    }
  }

  drawBoard(board) {
    const width = this.canvas.width;

    this.board = board;
    this.cellWidth = width / this.board.cellNum;

    let ctx = this.canvas.getContext("2d");
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, width, width);

    for (let i = this.cellWidth; i < board.cellNum * this.cellWidth; i += this.cellWidth) {
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();

      ctx.moveTo(i, 0);
      ctx.lineTo(i, width);
      ctx.stroke();
    }
  }

  fromRealToSimple(point) {
    return {
      x: Math.round(point.x / this.cellWidth),
      y: Math.round(point.y / this.cellWidth)
    }
  }

  fromSimpleToReal(x, y) {
    return {
      x: x * this.cellWidth,
      y: y * this.cellWidth
    }
  }

  drawStone(x, y, color) {
    let ctx = this.canvas.getContext("2d");

    x = x * this.cellWidth;
    y = y * this.cellWidth;

    let stoneRadius = this.cellWidth * 0.45;

    let grd = ctx.createRadialGradient(x, y, stoneRadius * 0.6, x, y, stoneRadius);
    let gradientColors = this.stoneColors[color];
    grd.addColorStop(0, gradientColors[0]);
    grd.addColorStop(1, gradientColors[1]);

    ctx.beginPath();
    ctx.arc(x, y, stoneRadius, 2 * Math.PI, false);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = gradientColors[1];
    ctx.stroke();
  }
}

exports.Painter = Painter;