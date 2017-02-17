var eventKeyboard = function (keyboard) {
	document.addEventListener("keydown", function(e){
		keyboard[e.keyCode] = true;
	}, false);

	document.addEventListener("keyup", function(e){
		delete keyboard[e.keyCode];	
	}, false);
};