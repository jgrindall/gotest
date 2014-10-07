define(


	['app/consts/playingstate', 'app/models/modelfacade', 'phasercomponents'],

function(PlayingState, ModelFacade, PhaserComponents) {
	
	"use strict";
	
	var ReplayCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ReplayCommand, PhaserComponents.Commands.AbstractCommand);

	ReplayCommand.prototype.execute = function(){
		this.modelFacade.get(ModelFacade.PLAYING).set(PlayingState.REPLAYING);
		this.modelFacade.get(ModelFacade.COMMTICKER).replay();
	};
	
  	return ReplayCommand;
});

