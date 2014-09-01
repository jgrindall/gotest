define('app/commands/replaycommand',['app/models/modelfacade'],

function(ModelFacade) {
	
	"use strict";
	
	var ReplayCommand = function(){
		
	};
	
	ReplayCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.PLAYING).setData(PlayingState.REPLAYING);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).replay();
	};
	
  	return ReplayCommand;
});

