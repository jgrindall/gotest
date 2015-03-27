define(


	['base/consts/playingstate', 'phasercomponents', 'base/models/modelconsts'],

function(PlayingState, PhaserComponents, ModelConsts) {
	
	"use strict";
	
	var ReplayCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ReplayCommand, PhaserComponents.Commands.AbstractCommand);

	ReplayCommand.prototype.execute = function(){
		this.modelFacade.get(ModelConsts.PLAYING).set(PlayingState.REPLAYING);
		this.modelFacade.get(ModelConsts.COMMTICKER).replay();
	};
	
  	return ReplayCommand;
});

