
define(['app/scenes/activity/abstractcommand'],

function(AbstractCommand){
	
	"use strict";
	
	var CommandSet = function(){
		this.clear();
	};
	
	CommandSet.prototype.add = function(c){
		this.commands.push(c);
	};
	
	CommandSet.prototype.clear = function(c){
		this.commands = [];
	};
	
	CommandSet.prototype.getLength = function(){
		return this.commands.length;
	};
	
	CommandSet.prototype.remove = function(){
		var c = this.commands.pop();
		return c;
	};
	
	return CommandSet;

});




