define(

	['base/models/modelconsts', 'phasercomponents', 'base/consts/playingstate'],

function(ModelConsts,  PhaserComponents, PlayingState) {
	
	"use strict";
	
	var StopCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(StopCommand, PhaserComponents.Commands.AbstractCommand);

	StopCommand.prototype.execute = function(){
		this.modelFacade.get(ModelConsts.PLAYING).set(PlayingState.NOT_PLAYING);
		this.modelFacade.get(ModelConsts.COMMTICKER).stop();
	};
	
  	return StopCommand;
});

