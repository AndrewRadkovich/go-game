'use strict';

import { EventBus } from './eventbus'
import { Board } from './board'
import { Clusters } from './entities'
import { Painter } from './painter'
import { Game } from './game'
import { Rules } from './rules'

document.addEventListener("DOMContentLoaded", () => {

    const width = 500;
    const cellNum = 19;
    const margin = (width / 2) / cellNum;
    console.log("margin = " + margin);

    let canvas = document.getElementById("board");
    let boardHolder = document.getElementById("board-holder");

    let board = new Board(cellNum - 1, margin);
    const eventbus = new EventBus()
        .attach(board)
        .attach(new Painter(margin, canvas))
        .attach(new Rules())
        .attach(new Game(board));

    let boardStyle = boardHolder.style;
    boardStyle.maxHeight = boardStyle.maxWidth = width + "px";
    boardStyle.minHeight = boardStyle.minWidth = (width / 1.5) + "px";
    canvas.height = canvas.width = width;

    canvas.addEventListener('click', (e) => eventbus.publish('board.clicked', {
        layerX: e.layerX,
        layerY: e.layerY
    }), false);
    eventbus.publish('game.start', {});
});
