define(

	['app/models/modelfacade', 'app/consts/playingstate', 'phasercomponents'],

function(ModelFacade, PlayingState, PhaserComponents) {
	
	"use strict";
	
	var StopCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(StopCommand, PhaserComponents.Commands.AbstractCommand);

	StopCommand.prototype.execute = function(){
		ModelFacade.getInstance().get(ModelFacade.COMM).stop();
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).reset();
		ModelFacade.getInstance().get(ModelFacade.PLAYING).set(PlayingState.NOT_PLAYING);
	};
	
  	return StopCommand;
});

