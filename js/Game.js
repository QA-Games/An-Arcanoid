'use strict';

var Game = function (canvas, ctx) {

    const _this = this;

    _this.canvas = canvas;
    _this.ctx = ctx;
    _this.FPS = 60;



    
    _this.player = {
        height: 30,
        width: 160,
        x: 0,
        y: 0,
        speed: 1,
        color: 'blue',

        init: function () {
            this.x = (_this.canvas.width / 2) - (this.width / 2);
            this.y = (_this.canvas.height - this.height - 10);
        },

        draw: function() {
            _this.ctx.fillStyle = this.color;
            _this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }

    };




    _this.ball = {
        height: 30,
        width: 30,
        x: 0,
        y: 0,
        speed: 1,
        color: 'red',

        init: function () {
            this.x = (_this.canvas.width / 2) - (this.width / 2);
            this.y = (_this.canvas.height - this.height - 100);
        },

        draw: function() {
            _this.ctx.fillStyle = this.color;
            _this.ctx.beginPath();
            _this.ctx.arc(
                this.x + this.width / 2,
                (this.y + 55) + this.height / 2,
                20,
                0,
                2 * Math.PI
            );
            _this.ctx.closePath();
            _this.ctx.fill();
        }

    };






    _this.init = function () {
        _this.player.init();
        _this.ball.init();
        _this.run();
    };

    _this.update = function () {};

    _this.draw = function () {
        _this.player.draw();
        _this.ball.draw();
    };

    _this.run = function () {        
        _this.update();
        _this.draw();
        //setTimeout(_this.run, 1000/_this.FPS);
    };

};