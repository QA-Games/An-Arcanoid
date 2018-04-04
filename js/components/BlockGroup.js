'use strict';

import { Engine } from './../Engine.js';
import { Block } from './Block.js';

export function BlockGroup() {

    const _this = this;

    _this.list = [];

    _this.update = update;
    _this.draw = draw;
    _this.init = init;

    init();

    function init() {
        let canvas = Engine.Game.canvas;

        let distanceX = 5;
        let screenHalf = canvas.height / 2;
        let minWidth = 30;
        let maxWidth = canvas.width - 30;

        let blocksQuantity = (maxWidth - minWidth) / (Engine.block.width + distanceX);

        let x = minWidth;
        let y = screenHalf / 2;

        for (let i = 0; i < blocksQuantity; i ++) {
            let block = new Block(x, y);
            x += (block.width + distanceX);
            _this.list.push(block);
        }
    }

    function update() {
        _this.list.forEach((block, index) => {
            if (block.checkCollision()) {
                delete _this.list[index];
            }
        });

        _this.list = _this.list.filter(function(item) { 
            return item != 'undefined' 
        });
    }

    function draw() {
        _this.list.forEach(function(block) {
           block.draw(); 
        });
    }
}