'use strict';

import { Engine } from './../Engine.js';

export function Block(x, y) {

    const _this = this;

    _this.x = 0;
    _this.y = 0;
    _this.width = Engine.block.width;
    _this.height = 15;
    _this.color = '#ff0000';

    _this.draw = draw;
    _this.checkCollision = checkCollision;

    init(x, y);

    function init(x, y) {
        _this.x = x;
        _this.y = y;
    }

    function checkCollision() {
        let ball = Engine.Game.Ball;
        let ballCollided = 
            ball.x + ball.width >= _this.x &&
            ball.x <= _this.x + _this.width &&
            ball.y <= _this.y + _this.height &&
            ball.y + ball.height >= _this.y;
        
            if (ballCollided) {
                ball.directionX = ball.directionX == 1 ? -1 : 1;
                ball.directionY = ball.directionY == 1 ? -1 : 1;
                Engine.Game.Score.increment(10);
                return true;
            }
        return false;
    }

    function draw() {
        let ctx = Engine.Game.ctx;
        ctx.fillStyle = _this.color;
        ctx.fillRect(_this.x, _this.y, _this.width, _this.height);
    }
}
