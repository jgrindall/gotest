define('app/commands/replaycommand',


	['app/consts/playingstate', 'app/models/modelfacade', 'phasercomponents'],

function(PlayingState, ModelFacade, PhaserComponents) {
	
	"use strict";
	
	var ReplayCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};
	
	ReplayCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	ReplayCommand.prototype.constructor = ReplayCommand;

	ReplayCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.PLAYING).setData(PlayingState.REPLAYING);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).replay();
	};
	
  	return ReplayCommand;
});

