
define([], function(){
	
	"use strict";
	
	var AbstractCommand = function(direction, color, index, total){
		this.direction = direction;
		this.index = index;
		this.total = total;
		this.color = color;
	};
	
	AbstractCommand.prototype.toJson = function(){
		return {'direction':this.direction, 'index':this.index, 'total':this.total, 'color':this.color};
	};
	
	return AbstractCommand;

});




