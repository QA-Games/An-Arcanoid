var Game = function(ball, player, score){
	this.ball = ball;
	this.player = player;
	this.score = score;
	var start = false;
	var pause = false;
	var lose =	false;
	var levelComplete = false;
	var keyboard = {};
	var blocks = new Array();
	var testLevel = 9;

	var generateBlocks = function(blocks){
		var insertX = 20;
		var qty = testLevel * 9;
		var insertY = canvas.height / 2;
		var distance = 30;
		var max = 580;
		var tipsLines = 0;

		blocks.push(new Block(insertX, insertY, 15, 25));	
		for(var count = 1; count < qty; count ++){					
			insertX += distance;
			if(insertX >= max){
				insertY -= 20;
				insertX = 20;
				tipsLines += 20;
				insertX += tipsLines;
				max -= 20;
				blocks.push(new Block(insertX, insertY, 15, 25));
			}else {
				blocks.push(new Block(insertX, insertY, 15, 25));			
	   		} 		
		}
	};	

	var stageClear = function(){
		var broken = 0;
		for(var i = 0; i < blocks.length; i++){
			if(blocks[i].status == false){
			broken++;
				if(broken == blocks.length){
					levelComplete = true;
					return levelComplete;
				 }
			}			
		}
	};
	eventKeyboard(keyboard);
	generateBlocks(blocks);

	var init = function(){
		drawBlock(blocks, "red");
		drawBall(this.ball, "#00ff00");
		drawPlayer(this.player, "blue");
		drawScore(this.score);
		this.ball.x = this.player.x + 40;
		this.player.movement(keyboard);
	};

	var startBall = function(keyboard) {
		if(32 in keyboard && !start){
			start = true;
		}
	};

	var pauseGame = function(keyboard) {
		if(27 in keyboard && start && !pause){
			pause = true;
		} 
	};

	var restartGame = function(keyboard){
		if(32 in keyboard && start && pause){
			pause = false;
		}
	};

	var gameOver = function(){
		if(this.ball.y > 400){
			lose = true;
			return lose;
		}		
	};	

	this.play = function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);		
		if(!start){
			init();
			startBall(keyboard);
		}else if(start && !pause && !lose && !levelComplete){
			var update = this.ball.moviment(this.player);
			var updatePlayer = this.player.movement(keyboard);
			this.ball.blockColision(blocks);
			this.score.incrementScore(blocks);
			drawBall(this.ball, "#00ff00");
			drawPlayer(this.player, "blue");
			drawBlock(blocks, "red");
			drawScore(this.score);
			stageClear();
			restartGame(keyboard);
			pauseGame(keyboard);
			gameOver();
			return 0;
		}else if(start && pause && !lose && !levelComplete){
			drawBall(this.ball, "#00ff00");
			drawPlayer(this.player, "blue");
			drawBlock(blocks, "red");
			drawScore(this.score);
			restartGame(keyboard);
			pauseGame(keyboard);
		}else if(lose && !levelComplete){
			gameOver();
			drawGameOver();
			drawBall(this.ball, "#00ff00");
			drawPlayer(this.player, "blue");
			drawBlock(blocks, "red");
			drawScore(this.score);	
		}else if(levelComplete){
			drawLevelComplete();
			drawBall(this.ball, "#00ff00");
			drawPlayer(this.player, "blue");
			drawScore(this.score);
		}
	};
};