
define('app/logocommands/abstractlogocommand', [], function(){
	
	"use strict";
	
	var AbstractCommand = function(json){
		this.direction = 	json.direction;
		this.index = 		json.index;
		this.total = 		json.total;
		this.color = 		json.color;
		this.width = 		json.width;
		this.diag = 		json.diag;
		this.stepLength = 	json.stepLength;
	};
	
	AbstractCommand.prototype.toJson = function(){
		return {'direction':this.direction, 'index':this.index, 'diag':this.diag, 'stepLength':this.stepLength, 'total':this.total, 'width':this.width, ':color':this.color};
	};
	
	AbstractCommand.prototype.toString = function(){
		return JSON.stringify(this.toJson());
	};
	
	return AbstractCommand;

});




