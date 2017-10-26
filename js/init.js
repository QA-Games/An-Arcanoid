'use strict';

//(function(){
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    
    canvas.width = 600;
    canvas.height = 400;
    
    document.body.appendChild(canvas);
    
    let game = new Game(canvas, ctx);
    game.init();
//})();