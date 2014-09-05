define('app/commands/startupcommand',['app/consts/defaults', 'app/models/modelfacade', 'phasercomponents'],

function(Defaults, ModelFacade, PhaserComponents) {
	
	"use strict";
	
	var StartUpCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};

	StartUpCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	StartUpCommand.prototype.constructor = StartUpCommand;

	StartUpCommand.prototype.execute = function(data){
		ModelFacade.getInstance().setData(Defaults.DEFAULT_JSON);
	};
	
  	return StartUpCommand;
});
