define(

	['app/models/modelfacade', 'phasercomponents'],

function(ModelFacade, PhaserComponents) {
	
	"use strict";
	
	var ExitFsCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ExitFsCommand, PhaserComponents.Commands.AbstractCommand);

	ExitFsCommand.prototype.execute = function(){
		
	};
	
  	return ExitFsCommand;
});

