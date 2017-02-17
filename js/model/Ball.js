var Ball = function (x, y, height, width, speed) {

	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.speed = speed;
	this.dirx = -1;
	this.diry = -1;
	this.mod = 0;
	this.direction = 1;	

	this.blockColision = function(blocks){
		var qty = 0;
		for(var i = 0; i < blocks.length; i++){
			if(blocks[i].status){
				if(this.x + this.width >= blocks[i].x ){
					if(this.x <= blocks[i].x + blocks[i].width){
						if(this.y <= blocks[i].y + blocks[i].height){
							if(this.y + this.height >= blocks[i].y){
								if(this.direction == 1){
									this.diry = 1;
									blocks[i].status = false;
								}else if(this.direction == 2){
										this.dirx = -1;
										blocks[i].status = false;
									}else if(this.direction == 3){
											this.dirx = 1;
											blocks[i].status = false;
										}else{
											this.diry = -1;
											blocks[i].status = false;
									}
							}
						}
					}
				}
			}					
		}
	};

	this.moviment = function(player){
		if(this.x + this.width >= player.x && this.x <= player.x + player.width && this.y + this.height >= player.y){
			this.diry = -1;
			this.direction = 1;
		}else if(this.x <= 0){
			this.dirx = 1;
			this.direction = 2;
		}else if(this.x + this.width >= canvas.width){
			this.dirx = -1;
			this.direction = 3;
		}else if(this.y <= 0){
			this.diry = 1;
			this.direction = 4;
		}

		this.x += (this.speed + this.mod) * this.dirx;
		this.y += (this.speed + this.mod) * this.diry;

		return this.exceedUser();
	};

	this.exceedUser = function(){
		if(this.y + (this.height / 2) >= canvas.height){
			return true;
		}
		return false;		
	};
};