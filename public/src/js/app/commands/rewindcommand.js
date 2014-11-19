define(

	['app/models/modelconsts', 'app/consts/playingstate', 'phasercomponents'],

function(ModelConsts, PlayingState, PhaserComponents) {
	
	"use strict";
	
	var RewindCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(RewindCommand, PhaserComponents.Commands.AbstractCommand);

	RewindCommand.prototype.execute = function(){
		this.modelFacade.get(ModelConsts.PLAYING).set(PlayingState.NOT_PLAYING);
		this.modelFacade.get(ModelConsts.COMM).rewind();
		this.modelFacade.get(ModelConsts.COMMTICKER).reset();
	};
	
  	return RewindCommand;
});

