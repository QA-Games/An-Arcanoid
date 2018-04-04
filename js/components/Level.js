'use strict';

import { Engine } from './../Engine.js';

export function Level() {

    const _this = this;

    _this.x = 0;
    _this.y = 0;
    _this.currentLevel = 1;

    _this.increment = increment;
    _this.draw = draw;
    _this.update = update;

    init();

    function init() {
        let canvas = Engine.Game.canvas;
        _this.x = 10;
        _this.y = 40;
        _this.currentLevel = 1;
    }

    function increment() {
        _this.currentLevel += 1;
    }

    function draw() {
        let ctx = Engine.Game.ctx;
        ctx.fillStyle = '#000';
        ctx.font = '18px Arial';
        ctx.fillText('Level: ' + _this.currentLevel, _this.x, _this.y);
    }

    function update() {}
}
