'use strict';

import { Engine } from './../Engine.js';

export function Player() {

    const _this = this;
    
    _this.height = 30;
    _this.width = 160;
    _this.x = 0;
    _this.y = 0;
    _this.speed = 6;
    _this.color = '#0000ff';

    _this.draw = draw;
    _this.update = update;

    init();

    function init() {
        _this.x = (Engine.Game.canvas.width / 2) - (80);
        _this.y = (Engine.Game.canvas.height - _this.height - 10);
        _this.draw();
    }

    function draw() {
        Engine.Game.ctx.fillStyle = _this.color;
        Engine.Game.ctx.fillRect(_this.x, _this.y, _this.width, _this.height);
    }

    function update() {
        move();
        checkBallCollision();
    }

    function move() {
        if (Engine.KEYBOARD_KEYS.LEFT_ARROW in Engine.keyboard && _this.x > 0) {		
            _this.x -= _this.speed;
            return;
        }
        
        if (Engine.KEYBOARD_KEYS.RIGHT_ARROW in Engine.keyboard && _this.x + _this.width < Engine.Game.canvas.width) {
            _this.x += _this.speed;
            return;
        }
    }

    function checkBallCollision() {
        let ball = Engine.Game.Ball;
        let ballCollided = 
            ball.x + ball.width >= _this.x &&
            ball.x <= _this.x + _this.width &&
            ball.y + ball.height >= _this.y;

        if (ballCollided) {
            ball.directionY = -1;
            ball.modifier += 0.09;
            ball.move();
        }
    }
}