define(

	['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var ExitFsCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ExitFsCommand, PhaserComponents.Commands.AbstractCommand);

	ExitFsCommand.prototype.execute = function(){
		
	};
	
  	return ExitFsCommand;
});
