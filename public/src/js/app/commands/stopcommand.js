define('app/commands/stopcommand',['app/models/modelfacade'],

function(ModelFacade, PlayingState) {
	
	"use strict";
	
	var StopCommand = function(){
		
	};
	
	StopCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.COMM).stop();
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).reset();
		ModelFacade.getInstance().get(ModelFacade.PLAYING).setData(PlayingState.NOT_PLAYING);
	};
	
  	return StopCommand;
});

