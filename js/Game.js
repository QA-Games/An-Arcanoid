'use strict';

var Game = function (canvas, ctx) {

    const _this = this;

    _this.canvas = canvas;
    _this.ctx = ctx;
    _this.FPS = 100;
    _this.keyboard = {};




    _this.eventKeyboard = function () {
        document.addEventListener('keydown', function(e){
            _this.keyboard[e.keyCode] = true;
        }, false);
    
        document.addEventListener('keyup', function(e){
            delete _this.keyboard[e.keyCode];	
        }, false);
    };



    
    _this.player = {
        height: 30,
        width: 160,
        x: 0,
        y: 0,
        speed: 6,
        color: '#0000ff',

        init: function () {
            this.x = (_this.canvas.width / 2) - (this.width / 2);
            this.y = (_this.canvas.height - this.height - 10);
        },

        draw: function() {
            _this.ctx.fillStyle = this.color;
            _this.ctx.fillRect(this.x, this.y, this.width, this.height);
        },

        update: function() {
            this.move();
            this.checkBallCollision();
        },

        move: function() {
            if (37 in _this.keyboard && this.x > 0) {		
                this.x -= this.speed;
                return;
            }
            
            if (39 in _this.keyboard && this.x + this.width < _this.canvas.width) {
                this.x += this.speed;
                return
            }
        },

        checkBallCollision: function () {
            var ballCollided = 
                _this.ball.x + _this.ball.width >= this.x &&
                _this.ball.x <= this.x + this.width &&
                _this.ball.y + _this.ball.height >= this.y;

            if (ballCollided) {
                _this.ball.directionY = -1;
                _this.ball.move();
            }
        }


    };




    _this.ball = {
        height: 30,
        width: 30,
        x: 0,
        y: 0,
        speed: 1,
        color: '#00ff00',
        directionX: -1,
        directionY: -1,
        modifier: 0,

        init: function() {
            this.x = (_this.canvas.width / 2) - (this.width / 2);
            this.y = (_this.canvas.height - this.height - 100);
        },

        draw: function() {
            _this.ctx.fillStyle = this.color;
            _this.ctx.beginPath();
            _this.ctx.arc(
                this.x + this.width / 2,
                this.y + this.height / 2,
                20,
                0,
                2 * Math.PI
            );
            _this.ctx.closePath();
            _this.ctx.fill();
        },

        update: function() {
            if (this.x <= 0) this.directionX = 1;
            if (this.x + this.width >= _this.canvas.width) this.directionX = -1;
            if (this.y <= 0) this.directionY = 1;
            if (this.y + this.height >= _this.canvas.height) this.directionY = -1;

            this.move();    
        },

        move: function() {
            this.x += (this.speed + this.modifier) * this.directionX;
            this.y += (this.speed + this.modifier) * this.directionY;
        }

    };






    _this.init = function () {
        _this.eventKeyboard();
        _this.player.init();
        _this.ball.init();
        _this.run();
    };

    _this.update = function () {
        _this.player.update();
        _this.ball.update();
    };

    _this.draw = function () {
        _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
        _this.player.draw();
        _this.ball.draw();
    };

    _this.run = function () {        
        _this.update();
        _this.draw();
        setTimeout(_this.run, 1000/_this.FPS);
    };

};