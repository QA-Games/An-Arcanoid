var Player = function(x, y, height, width, speed){
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.speed = speed;

	this.movement = function(keyboard){		
		if(37 in keyboard && this.x > 0){			
			this.x -= this.speed;
		}else if(39 in keyboard && this.x + this.width < canvas.width){
			this.x += this.speed;
		}
		else
		{

		}	
	};

};

