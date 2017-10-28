'use strict';

let Game = function (_canvas, _ctx) {

    //Properties    
    const _this = this;
    const canvas = _canvas;
    const ctx = _ctx;

    let FPS = 100;
    let frames = 0;
    
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

    let Block = {
        x: 0,
        y: 0,
        width: 25,
        height: 15,
        color: '#ff0000',
        init: function(_x, _y) {
            this.x = _x;
            this.y = _y;
        },
        checkCollision: function() {
            let ballCollided = 
                ball.x + ball.width >= this.x &&
                ball.x <= this.x + this.width &&
                ball.y <= this.y + this.height &&
                ball.y + ball.height >= this.y;
            
                if (ballCollided) {
                    ball.directionX = ball.directionX == 1 ? -1 : 1;
                    ball.directionY = ball.directionY == 1 ? -1 : 1;
                    score.increment(10);
                    return true;
                }
            return false;
        },
        draw: function() {
            ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };

    let blocksGroup = {
        list: [],
        init: function() {
            let distanceX = 5;
            let screenHalf = canvas.height / 2;
            let minWidth = 30;
            let maxWidth = canvas.width - 30;

            let blocksQuantity = (maxWidth - minWidth) / (Block.width + distanceX);

            let x = minWidth;
            let y = screenHalf / 2;

            for (var i = 0; i < blocksQuantity; i ++) {
                let block = Object.create(Block);
                block.init(x, y);
                x += (block.width + distanceX);
                this.list.push(block);
            }
        },
        update: function() {
            this.list.forEach((block, index) => {
                if (block.checkCollision()) {
                    delete this.list[index];
                }
            });

            this.list = this.list.filter(function(item) { 
                return item != 'undefined' 
            });
        },
        draw: function() {
            this.list.forEach(function(block) {
               block.draw(); 
            });
        }
    };

    let display = {
        x: 100,
        y: 200,
        color: '#ff0000',
        font: '30px Arial',
        draw: function(text, _color, _font) {
            ctx.fillStyle = typeof _color != 'undefined' ? _color : this.color;
            ctx.font = typeof _font != 'undefined' ? _font : this.font;
            ctx.fillText(text, this.x, this.y);
        }
    };

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
                ball.modifier += 0.09;
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

    function init () {
        eventKeyboard();
        player.init();
        ball.init();
        blocksGroup.init();
        run();
    };

    function update () {
        player.update();
        ball.update();
        blocksGroup.update();
    };

    function draw () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        ball.draw();
        score.draw();
        life.draw();
        blocksGroup.draw();
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
                if (!blocksGroup.list.length) setGameState(GAME_STATES.NEXT_LEVEL);
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
                display.draw('GAME OVER YEAHHHH!!!!!');        
                break;
            case GAME_STATES.NEXT_LEVEL:
                display.draw('LEVEL COMPLETED!!!');
                break;
        }

        frames ++;
        setTimeout(run, 1000/FPS);
    };
};