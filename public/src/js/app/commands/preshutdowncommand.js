define(

	['app/models/modelfacade', 'phasercomponents', 'app/views/showmanager'],

function(ModelFacade, PhaserComponents, ShowManager) {
	
	"use strict";

	var PreShutdownCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(PreShutdownCommand, PhaserComponents.Commands.AbstractCommand);

	PreShutdownCommand.prototype.execute = function(){
		ModelFacade.shutdown();
		ShowManager.shutdown();
	};
	
  	return PreShutdownCommand;
});

