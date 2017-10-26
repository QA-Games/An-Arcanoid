'use strict';

//(function(){
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    
    canvas.width = 600;
    canvas.height = 400;
    
    document.body.appendChild(canvas);
    
    var game = new Game(canvas, ctx);
    game.init();
//})();