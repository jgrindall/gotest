define('app/commands/finishcommand',['app/consts/playingstate'],

function(PlayingState) {
	
	"use strict";
	
	var FinishCommand = function(){
		
	};
	
	FinishCommand.prototype.execute = function(data){
		var ModelFacade = require('app/models/modelfacade');
		ModelFacade.getInstance().get(ModelFacade.PLAYING).setData(PlayingState.NOT_PLAYING);
	};
	
  	return FinishCommand;
});
