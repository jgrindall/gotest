define('app/commands/loadcommand',['app/models/modelfacade', 'app/consts/playingstate'],

function(ModelFacade, PlayingState) {
	
	"use strict";
	
	var FinishCommand = function(){
		
	};
	
	FinishCommand.prototype.execute = function(data){
		ModelFacade.get(ModelFacade.PLAYING).setData(PlayingState.NOT_PLAYING);
	};
	
  	return FinishCommand;
});
