'use strict';

let Game = function (_canvas, _ctx) {

    //Properties
    
    const _this = this;
    const canvas = _canvas;
    const ctx = _ctx;

    let FPS = 100;
    let frames = 0;

    let currentLevel = 1;
    
    let keyboard = {};
    const KEYBOARD_KEYS = {
        SPACE: 32,
        RIGHT_ARROW: 39,
        LEFT_ARROW: 37,
        ESC: 27
    };

    const GAME_STATES = {
        ENDED: 'ENDED',
        NEXT_LEVEL: 'NEXT_LEVEL',
        NOT_STARTED: 'NOT_STARTED',
        PAUSED: 'PAUSED',
        RUNNING: 'RUNNING'
    };

    let currentState = GAME_STATES.NOT_STARTED;

    let score = {
        x: canvas.width - 100,
        y: 40,
        value: 0,
        increment: function (_increment) {
            this.value += _increment;
        },
        draw: function () {
            ctx.fillStyle = '#000';
            ctx.font = '18px Arial';
            ctx.fillText('Score: ' + this.value, this.x, this.y);
        }
    };

    let life = {
        x: canvas.width - 100,
        y: 20,
        value: 2,
        decrement: function() {
            this.value --;
        },
        increment: function() {
            this.value ++;
        },
        draw: function() {
            ctx.fillStyle = '#000';
            ctx.font = '18px Arial';
            ctx.fillText('Lifes: ' + this.value, this.x, this.y);
        }
    };

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
            if (KEYBOARD_KEYS.LEFT_ARROW in keyboard && this.x > 0) {		
                this.x -= this.speed;
                return;
            }
            
            if (KEYBOARD_KEYS.RIGHT_ARROW in keyboard && this.x + this.width < canvas.width) {
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
            this.directionX = -1;
            this.directionY = -1;
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
            if (this.y + this.height >= canvas.height) setGameState(GAME_STATES.ENDED);

            this.move();    
        },

        move: function() {
            this.x += (this.speed + this.modifier) * this.directionX;
            this.y += (this.speed + this.modifier) * this.directionY;
        }

    };

    //Methods
    
    init();

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
    
    function gameOver() {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'Red';
        ctx.fillText('GAME OVER YEAHHHH!!!!!', 100, 200);
    }

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
        score.draw();
        life.draw();
    };

    function run () {

        switch (currentState) {

            case GAME_STATES.NOT_STARTED:
                draw();
                if (KEYBOARD_KEYS.SPACE in keyboard) setGameState(GAME_STATES.RUNNING);        
                break;
            case GAME_STATES.RUNNING:
                update();
                draw();
                if (KEYBOARD_KEYS.ESC in keyboard) setGameState(GAME_STATES.PAUSED);        
                break;
            case GAME_STATES.PAUSED:
                draw();
                if (KEYBOARD_KEYS.SPACE in keyboard) setGameState(GAME_STATES.RUNNING);        
                break;
            case GAME_STATES.ENDED:
                if (life.value) {
                    life.decrement();
                    player.init();
                    ball.init();
                    setGameState(GAME_STATES.RUNNING)
                    break;
                }
                gameOver();        
                break;
        }

        frames ++;
        setTimeout(run, 1000/FPS);
    };
};