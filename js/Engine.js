'use strict';

export const Engine = {

    Game: {},

    keyboard: {},

    KEYBOARD_KEYS: {
        SPACE: 32,
        RIGHT_ARROW: 39,
        LEFT_ARROW: 37,
        ESC: 27
    },

    keyboardEventListener: keyboardEventListener,

    display: {
        x: 100,
        y: 200,
        color: '#ff0000',
        font: '30px Arial',
        draw: display
    },

    draw: draw,

    update: update,

    run: run,

    block: {
        width: 25
    }
}

function keyboardEventListener() {
    document.addEventListener('keydown', function(e) {
        Engine.keyboard[e.keyCode] = true;
    }, false);

    document.addEventListener('keyup', function(e){
        delete Engine.keyboard[e.keyCode];	
    }, false);
}

function draw() {
    let game = Engine.Game;
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.components.map((component) => {
        component.draw()
    });
}

function update() {
    Engine.Game.components.map((component) => {
        component.update()
    });
}

function run() {
    let game = Engine.Game;
    game.GAME_STATES[game.currentState].action();
    game.frames ++;
    setTimeout(run, 1000 / game.fps);
}

function display(text, color, font) {
    let ctx = Engine.Game.ctx;
    let _this = Engine.display;
    ctx.fillStyle = typeof color != 'undefined' ? color : _this.color;
    ctx.font = typeof font != 'undefined' ? font : _this.font;
    ctx.fillText(text, _this.x, _this.y);
}
