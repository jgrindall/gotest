define(

	['app/models/modelfacade', 'app/consts/playingstate', 'phasercomponents'],

function(ModelFacade, PlayingState, PhaserComponents) {
	
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

