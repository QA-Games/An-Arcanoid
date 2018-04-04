'use strict';

import { Engine } from './../Engine.js';

export function Ball() {
    
    const _this = this;

    _this.height = 30;
    _this.width = 30;
    _this.x = 0;
    _this.y = 0;
    _this.speed = 1;
    _this.color = '#00ff00';
    _this.directionX = -1;
    _this.directionY = -1;
    _this.modifier = 0;

    _this.draw = draw;
    _this.update = update;
    _this.move = move;
    _this.init = init;

    init();

    function init() {
        let canvas = Engine.Game.canvas;
        _this.x = (canvas.width / 2) - (_this.width / 2);
        _this.y = (canvas.height - _this.height - 100);
        _this.directionY = -1;
        _this.draw();
    }

    function draw() {
        let ctx = Engine.Game.ctx;
        ctx.fillStyle = _this.color;
        ctx.beginPath();
        ctx.arc(
            _this.x + _this.width / 2,
            _this.y + _this.height / 2,
            20,
            0,
            2 * Math.PI
        );
        ctx.closePath();
        ctx.fill();
    }

    function update() {
        let canvas = Engine.Game.canvas;
        if (_this.x <= 0) _this.directionX = 1;
        if (_this.x + _this.width >= canvas.width) _this.directionX = -1;
        if (_this.y <= 0) _this.directionY = 1;
        if (_this.y + _this.height >= canvas.height)
            Engine.Game.setGameState(Engine.Game.GAME_STATES.ENDED.key);

        move();    
    }

    function move() {
        _this.x += (_this.speed + _this.modifier) * _this.directionX;
        _this.y += (_this.speed + _this.modifier) * _this.directionY;
    }
}