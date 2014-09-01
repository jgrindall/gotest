define('app/commands/replaycommand',['app/consts/playingstate', 'app/models/modelfacade'],

function(PlayingState, ModelFacade) {
	
	"use strict";
	
	var ReplayCommand = function(){
		
	};
	
	ReplayCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.PLAYING).setData(PlayingState.REPLAYING);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).replay();
	};
	
  	return ReplayCommand;
});

