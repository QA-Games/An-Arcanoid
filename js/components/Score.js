'use strict';

import { Engine } from './../Engine.js';

export function Score() {

    const _this = this;

    _this.x = 0;
    _this.y = 0;
    _this.value = 0;

    _this.increment = increment;
    _this.draw = draw;
    _this.update = update;

    init();

    function init() {
        let canvas = Engine.Game.canvas;
        _this.x = canvas.width - 100;
        _this.y = 40;
    }

    function increment(value) {
        _this.value += value;
    }

    function draw() {
        let ctx = Engine.Game.ctx;
        ctx.fillStyle = '#000';
        ctx.font = '18px Arial';
        ctx.fillText('Score: ' + _this.value, _this.x, _this.y);
    }

    function update() {}
}
