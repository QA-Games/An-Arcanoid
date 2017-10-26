'use strict';

let Game = function (_canvas, _ctx) {

    //Propierties

    const _this = this;
    
    const canvas = _canvas;
    const ctx = _ctx;
    const FPS = 100;
    let keyboard = {};

    const GAME_STATES = {
        ENDED: 'ENDED',
        NEXT_LEVEL: 'NEXT_LEVEL',
        NOT_STARTED: 'NOT_STARTED',
        PAUSED: 'PAUSED',
        RUNNING: 'RUNNING'
    }

    let currentState = GAME_STATES.NOT_STARTED;

    //Methods
    _this.init = init;

    function setGameState(newGameState) {
        if (newGameState in GAME_STATES) {
            currentState = newGameState;
        } 
    }


    function eventKeyboard() {
        document.addEventListener('keydown', function(e){
            keyboard[e.keyCode] = true;
        }, false);
    
        document.addEventListener('keyup', function(e){
            delete keyboard[e.keyCode];	
        }, false);
    }


    
    let player = {
        height: 30,
        width: 160,
        x: 0,
        y: 0,
        speed: 6,
        color: '#0000ff',

        init: function () {
            this.x = (canvas.width / 2) - (this.width / 2);
            this.y = (canvas.height - this.height - 10);
            this.draw();
        },

        draw: function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },

        update: function() {
            this.move();
            this.checkBallCollision();
        },

        move: function() {
            if (37 in keyboard && this.x > 0) {		
                this.x -= this.speed;
                return;
            }
            
            if (39 in keyboard && this.x + this.width < canvas.width) {
                this.x += this.speed;
                return;
            }
        },

        checkBallCollision: function () {
            let ballCollided = 
                ball.x + ball.width >= this.x &&
                ball.x <= this.x + this.width &&
                ball.y + ball.height >= this.y;

            if (ballCollided) {
                ball.directionY = -1;
                ball.move();
            }
        }


    };


    let ball = {
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
            this.x = (canvas.width / 2) - (this.width / 2);
            this.y = (canvas.height - this.height - 100);
            this.draw();
        },

        draw: function() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(
                this.x + this.width / 2,
                this.y + this.height / 2,
                20,
                0,
                2 * Math.PI
            );
            ctx.closePath();
            ctx.fill();
        },

        update: function() {
            if (this.x <= 0) this.directionX = 1;
            if (this.x + this.width >= canvas.width) this.directionX = -1;
            if (this.y <= 0) this.directionY = 1;
            if (this.y + this.height >= canvas.height) this.directionY = -1;

            this.move();    
        },

        move: function() {
            this.x += (this.speed + this.modifier) * this.directionX;
            this.y += (this.speed + this.modifier) * this.directionY;
        }

    };



    function init () {
        eventKeyboard();
        player.init();
        ball.init();
        run();
    };

    function update () {
        player.update();
        ball.update();
    };

    function draw () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        ball.draw();
    };

    function run () {

        switch (currentState) {

            case GAME_STATES.NOT_STARTED:
                player.init();
                ball.init();
                if (32 in keyboard) setGameState(GAME_STATES.RUNNING);        
                break;
            case GAME_STATES.RUNNING:
                update();
                draw();
                if (27 in keyboard) setGameState(GAME_STATES.PAUSED);        
                break;
            case GAME_STATES.PAUSED:
                draw();
                if (32 in keyboard) setGameState(GAME_STATES.RUNNING);        
                break;
        }

        setTimeout(run, 1000/FPS);
    };

};