define('app/commands/finishcommand',

	['app/consts/playingstate', 'app/models/modelfacade', 'phasercomponents'],

function(PlayingState, ModelFacade, PhaserComponents) {
	
	"use strict";
	
	var FinishCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(FinishCommand, PhaserComponents.Commands.AbstractCommand);

	FinishCommand.prototype.execute = function(){
		ModelFacade.getInstance().get(ModelFacade.PLAYING).set(PlayingState.NOT_PLAYING);
	};
	
  	return FinishCommand;
});
