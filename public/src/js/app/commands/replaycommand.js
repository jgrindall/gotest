define('app/commands/replaycommand',


	['app/consts/playingstate', 'app/models/modelfacade', 'phasercomponents'],

function(PlayingState, ModelFacade, PhaserComponents) {
	
	"use strict";
	
	var ReplayCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	ReplayCommand.prototype = Object.create(PhaserComponents.Commands.AbstractCommand.prototype);
	ReplayCommand.prototype.constructor = ReplayCommand;

	ReplayCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.PLAYING).set(PlayingState.REPLAYING);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).replay();
	};
	
  	return ReplayCommand;
});

