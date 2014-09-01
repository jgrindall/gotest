define('app/commands/drawcommand',['app/consts/playingstate'],

function(PlayingState) {
	
	"use strict";
	
	var DrawCommand = function(){
		
	};
	
	DrawCommand.prototype.execute = function(data){
		var ModelFacade, playingModel;
		ModelFacade = require('app/models/modelfacade');
		playingModel = ModelFacade.getInstance().get(ModelFacade.PLAYING);
		if(playingModel.getData().playing !== PlayingState.PLAYING){
			playingModel.setData(PlayingState.PLAYING);
			ModelFacade.getInstance().get(ModelFacade.COMMTICKER).start();
		}
	};
	
  	return DrawCommand;
});

