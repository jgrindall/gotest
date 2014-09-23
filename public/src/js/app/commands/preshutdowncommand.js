define(

	['app/models/modelfacade', 'phasercomponents'],

function(ModelFacade, PhaserComponents) {
	
	"use strict";

	var PreShutdownCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(PreShutdownCommand, PhaserComponents.Commands.AbstractCommand);

	PreShutdownCommand.prototype.execute = function(){
		ModelFacade.shutdown();
	};
	
  	return PreShutdownCommand;
});

