var drawBall = function (ball, color) {
	ctx.fillStyle = color;
	ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
	ctx.beginPath();
	ctx.arc(ball.x + ball.width / 2, ball.y + ball.height / 2, 14, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
};

var drawPlayer = function (player, color){
	ctx.fillStyle = color;
	ctx.fillRect(player.x, player.y, player.width, player.height);
};

var drawBlock = function (block_array, color){	
	for(var i = 0; i < block_array.length; i++){
		if(block_array[i].status){			
			ctx.fillStyle = color;
			ctx.fillRect(block_array[i].x, block_array[i].y, block_array[i].width, block_array[i].height);
		}
	}	
};

var drawGameOver = function(){
	ctx.fillText("GAME OVER YEAHHHH!!!!!",300,300);
};

var drawLevelComplete = function(){
	ctx.fillStyle = "Green";
	ctx.fillText("Level Complete!",300,300);
};

var drawScore = function(score){
	ctx.fillStyle = "Black";
	ctx.fillText("Score:" + score.score, score.x, score.y);
}