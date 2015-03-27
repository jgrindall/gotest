define(


	['base/consts/playingstate', 'phasercomponents', 'base/models/modelconsts'],

function(PlayingState, PhaserComponents, ModelConsts) {
	
	"use strict";
	
	var ReplayShareCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ReplayShareCommand, PhaserComponents.Commands.AbstractCommand);

	ReplayShareCommand.prototype.execute = function(){
		console.log("replay share!!");
		this.modelFacade.get(ModelConsts.PLAYING).set(PlayingState.REPLAYING_SHARE);
		this.modelFacade.get(ModelConsts.COMMTICKER).replay();
	};
	
  	return ReplayShareCommand;
});

