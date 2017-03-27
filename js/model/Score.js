var Score = function(x, y, score){
	this.x = x;
	this.y = y;
	this.score = score;

	this.incrementScore = function(blocks){
		for(var i = 0; i < blocks.length; i++){
			if(blocks[i].status == false){
				this.score += 10;
				blocks.splice(i, 1);
			}
			else{

			}
		}
	}
};