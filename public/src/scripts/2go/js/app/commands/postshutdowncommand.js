define(

	['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";

	var PostShutdownCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(PostShutdownCommand, PhaserComponents.Commands.AbstractCommand);

	PostShutdownCommand.prototype.execute = function(){
		
	};
	
  	return PostShutdownCommand;
});
