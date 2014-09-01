define('app/commands/finishcommand',['app/consts/playingstate', 'app/models/modelfacade'],

function(PlayingState, ModelFacade) {
	
	"use strict";
	
	var FinishCommand = function(){
		
	};
	
	FinishCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.PLAYING).setData(PlayingState.NOT_PLAYING);
	};
	
  	return FinishCommand;
});
