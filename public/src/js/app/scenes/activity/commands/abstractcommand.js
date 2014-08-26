
define([], function(){
	
	"use strict";
	
	var AbstractCommand = function(direction, color, index, total){
		this.direction = direction;
		this.index = index;
		this.total = total;
		this.color = color;
	};
	
	AbstractCommand.fromJson = function(json){
		return new AbstractCommand(json.index, json.color, json.index, json.total);
	};
	
	return AbstractCommand;

});




