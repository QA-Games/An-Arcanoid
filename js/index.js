'use strict';

import { Game } from './Game.js';
import { Engine } from './Engine.js';

const config = {
    width: 600,
    height: 400,
    fps: 120
};

let game = new Game(config);

console.log('Engine', Engine);
