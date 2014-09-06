define('app/commands/finishcommand',

	['app/consts/playingstate', 'app/models/modelfacade', 'phasercomponents'],

function(PlayingState, ModelFacade, PhaserComponents) {
	
	"use strict";
	
	var FinishCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	FinishCommand.prototype = Object.create(PhaserComponents.Commands.AbstractCommand.prototype);
	FinishCommand.prototype.constructor = FinishCommand;

	FinishCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.PLAYING).set(PlayingState.NOT_PLAYING);
	};
	
  	return FinishCommand;
});
