
define( [], function(){
	
	"use strict";
	
	var AbstractLogoCommand = function(json){
		this.direction = 	json.direction;
		this.index = 		json.index;
		this.total = 		json.total;
		this.color = 		json.color;
		this.width = 		json.width;
		this.diag = 		json.diag;
		this.angle = 		json.angle;
		this.stepLength = 	json.stepLength;
	};
	
	AbstractLogoCommand.prototype.toJson = function(){
		var data = {'direction':this.direction, 'angle':this.angle, 'index':this.index, 'diag':this.diag, 'stepLength':this.stepLength, 'total':this.total, 'width':this.width, 'color':this.color};
		return data;
	};
	
	AbstractLogoCommand.prototype.toString = function(){
		return JSON.stringify(this.toJson());
	};
	
	return AbstractLogoCommand;

});




