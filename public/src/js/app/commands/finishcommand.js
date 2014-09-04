define('app/commands/finishcommand',

	['app/consts/playingstate', 'app/models/modelfacade', 'app/commands/abstractcommand'],

function(PlayingState, ModelFacade, AbstractCommand) {
	
	"use strict";
	
	var FinishCommand = function(){
		AbstractCommand.call(this);
	};
	
	FinishCommand.prototype = Object.create(AbstractCommand.prototype);
	FinishCommand.prototype.constructor = FinishCommand;

	FinishCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.PLAYING).setData(PlayingState.NOT_PLAYING);
	};
	
  	return FinishCommand;
});
