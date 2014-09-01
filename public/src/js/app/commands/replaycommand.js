define('app/commands/replaycommand',['app/consts/playingstate'],

function(PlayingState) {
	
	"use strict";
	
	var ReplayCommand = function(){
		
	};
	
	ReplayCommand.prototype.execute = function(data){
		console.log("replay command");
		var ModelFacade = require('app/models/modelfacade');
		ModelFacade.getInstance().get(ModelFacade.PLAYING).setData(PlayingState.REPLAYING);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).replay();
	};
	
  	return ReplayCommand;
});

