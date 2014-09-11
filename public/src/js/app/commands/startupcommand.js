define('app/commands/startupcommand',['app/consts/defaults', 'app/models/modelfacade', 'phasercomponents'],

function(Defaults, ModelFacade, PhaserComponents) {
	
	"use strict";
	
	var StartUpCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};

	PhaserComponents.Utils.extends(StartUpCommand, PhaserComponents.Commands.AbstractCommand);

	StartUpCommand.prototype.execute = function(){
		ModelFacade.getInstance().setData(Defaults.DEFAULT_JSON);
	};
	
  	return StartUpCommand;
});
