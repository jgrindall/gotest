define(

	['phasercomponents'],

function( PhaserComponents) {
	
	"use strict";

	var PreShutdownCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(PreShutdownCommand, PhaserComponents.Commands.AbstractCommand);

	PreShutdownCommand.prototype.execute = function(){
		
	};
	
  	return PreShutdownCommand;
});

