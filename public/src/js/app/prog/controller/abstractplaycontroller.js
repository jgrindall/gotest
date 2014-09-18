define( [],

	function(){
	
	"use strict";

	var AbstractPlayController = function(parent){
		this.parent = parent;
	};

	AbstractPlayController.prototype.addCommand = function(dir, type){
		this.parent.addCommand(dir, type);
	};

	AbstractPlayController.prototype.destroy = function(){
		this.parent = null;
	};

	AbstractPlayController.prototype.addCommands = function(commands){
		var that = this;
		commands.forEach(function(command){
			if(command){
				that.parent.addCommand(command.direction, command.type, command.total);
			}
		});
	};

	return AbstractPlayController;
});
