define('app/commands/replaycommand',


	['app/consts/playingstate', 'app/models/modelfacade', 'app/commands/abstractcommand'],

function(PlayingState, ModelFacade, AbstractCommand) {
	
	"use strict";
	
	var ReplayCommand = function(){
		AbstractCommand.call(this);
	};
	
	ReplayCommand.prototype = Object.create(AbstractCommand.prototype);
	ReplayCommand.prototype.constructor = ReplayCommand;

	ReplayCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.PLAYING).setData(PlayingState.REPLAYING);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).replay();
	};
	
  	return ReplayCommand;
});

