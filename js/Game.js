'use strict';

import { Engine } from './Engine.js';
import { Player } from './components/Player.js';
import { Ball } from './components/Ball.js';
import { BlockGroup } from './components/BlockGroup.js';
import { Score } from './components/Score.js'

export function Game(config) {

    const _this = this;

    _this.frames = 0;

    const GAME_STATES = {
        ENDED: { key: 'ENDED', action: ended },
        NEXT_LEVEL: { key: 'NEXT_LEVEL', action: nextLevel },
        NOT_STARTED: { key: 'NOT_STARTED', action: notStarted },
        PAUSED: { key: 'PAUSED', action: paused },
        RUNNING: { key: 'RUNNING', action: running }
    };

    _this.components = [];
    _this.setGameState = setGameState;

    init(config);

    function init(config) {

        Engine.Game = _this;
        Engine.keyboardEventListener();
        
        _this.fps = config.fps;
        _this.GAME_STATES = GAME_STATES;

        createCanvas(config);
        
        _this.Ball = new Ball();
        _this.Player = new Player();
        _this.BlockGroup = new BlockGroup();
        _this.Score = new Score();
        
        _this.components = [
            _this.Ball,
            _this.Player,
            _this.BlockGroup,
            _this.Score
        ];

        setGameState(GAME_STATES.NOT_STARTED.key);
        Engine.run();
    }

    function createCanvas(config) {
        _this.canvas = document.createElement('canvas');
        _this.ctx = _this.canvas.getContext('2d');

        _this.canvas.width = config.width;
        _this.canvas.height = config.height;

        document.body.appendChild(_this.canvas);
    }

    function setGameState(newGameState) {
        if (newGameState in GAME_STATES) {
            _this.currentState = newGameState;
        }
    }

    function ended() {
        Engine.display.draw('GAME OVER YEAHHHH!!!!!');
    }

    function nextLevel() {
        Engine.display.draw('LEVEL COMPLETED!!!');
    }

    function notStarted() {
        Engine.draw();
        if (Engine.KEYBOARD_KEYS.SPACE in Engine.keyboard) {
            setGameState(GAME_STATES.RUNNING.key);
        }
    }

    function paused() {
        Engine.draw();
        if (Engine.KEYBOARD_KEYS.SPACE in Engine.keyboard)
            setGameState(GAME_STATES.RUNNING.key);
    }

    function running() {
        Engine.update();
        Engine.draw();
        if (Engine.KEYBOARD_KEYS.ESC in Engine.keyboard)
            setGameState(GAME_STATES.PAUSED.key);
        if (!_this.BlockGroup.list.length)
            setGameState(GAME_STATES.NEXT_LEVEL.key);
    }

}
