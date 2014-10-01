define(

	['app/models/modelfacade', 'app/consts/playingstate', 'phasercomponents'],

function(ModelFacade, PlayingState, PhaserComponents) {
	
	"use strict";
	
	var RewindCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(RewindCommand, PhaserComponents.Commands.AbstractCommand);

	RewindCommand.prototype.execute = function(){
		ModelFacade.getInstance().get(ModelFacade.COMM).stop();
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).reset();
		ModelFacade.getInstance().get(ModelFacade.PLAYING).set(PlayingState.NOT_PLAYING);
	};
	
  	return RewindCommand;
});

