define('app/commands/drawcommand',['app/models/modelfacade', 'app/consts/playingstate'],

function(ModelFacade, PlayingState) {
	
	"use strict";
	
	var DrawCommand = function(){
		
	};
	
	DrawCommand.prototype.execute = function(data){
		var playingModel = ModelFacade.getInstance().get(ModelFacade.PLAYING);
		if(playingModel.getData().playing !== PlayingState.PLAYING){
			playingModel.setData(PlayingState.PLAYING);
			ModelFacade.getInstance().get(ModelFacade.COMMTICKER).start();
		}
	};
	
  	return DrawCommand;
});

