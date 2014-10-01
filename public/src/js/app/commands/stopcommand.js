define(

	['app/models/modelfacade', 'phasercomponents'],

function(ModelFacade,  PhaserComponents) {
	
	"use strict";
	
	var StopCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(StopCommand, PhaserComponents.Commands.AbstractCommand);

	StopCommand.prototype.execute = function(){
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).stop();
	};
	
  	return StopCommand;
});

