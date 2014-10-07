define(

	['app/models/modelfacade', 'app/consts/playingstate', 'phasercomponents'],

function(ModelFacade, PlayingState, PhaserComponents) {
	
	"use strict";
	
	var RewindCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(RewindCommand, PhaserComponents.Commands.AbstractCommand);

	RewindCommand.prototype.execute = function(){
		this.modelFacade.get(ModelFacade.COMM).rewind();
		this.modelFacade.get(ModelFacade.COMMTICKER).reset();
		this.modelFacade.get(ModelFacade.PLAYING).set(PlayingState.NOT_PLAYING);
	};
	
  	return RewindCommand;
});

