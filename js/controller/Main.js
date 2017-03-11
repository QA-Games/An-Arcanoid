var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var ball = new Ball(canvas.width / 2 - 6, canvas.height - 51, 8, 8, 1);
var player = new Player(canvas.width /2 - 50, canvas.height - 30, 20, 100, 5);

var game = new Game(ball, player);

setInterval(game.play, 10);
