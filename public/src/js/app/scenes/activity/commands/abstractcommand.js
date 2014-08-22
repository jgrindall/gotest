
define([], function(){
	
	"use strict";
	
	var AbstractCommand = function(direction, color, index, total){
		this.direction = direction;
		this.index = index;
		this.total = total;
		this.color = color;
	};
	
	return AbstractCommand;

});




