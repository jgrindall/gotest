
define('app/logocommands/abstractlogocommand', [], function(){
	
	"use strict";
	
	var AbstractCommand = function(json){
		this.direction = 	json.direction;
		this.index = 		json.index;
		this.total = 		json.total;
		this.color = 		json.color;
		this.width = 		json.width;
	};
	
	AbstractCommand.prototype.toJson = function(){
		return {'direction':this.direction, 'index':this.index, 'total':this.total, 'width':this.width, ':color':this.color};
	};
	
	AbstractCommand.prototype.toString = function(){
		return JSON.stringify(this.toJson());
	};
	
	return AbstractCommand;

});




