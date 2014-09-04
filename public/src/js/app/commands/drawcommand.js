define('app/commands/drawcommand',

	['app/models/modelfacade', 'app/consts/playingstate', 'app/commands/abstractcommand'],

function(ModelFacade, PlayingState, AbstractCommand) {
	
	"use strict";
	
	var DrawCommand = function(){
		AbstractCommand.call(this);
	};
	
	DrawCommand.prototype = Object.create(AbstractCommand.prototype);
	DrawCommand.prototype.constructor = DrawCommand;

	DrawCommand.prototype.execute = function(data){
		var playingModel;
		playingModel = ModelFacade.getInstance().get(ModelFacade.PLAYING);
		if(playingModel.getData().playing !== PlayingState.PLAYING){
			playingModel.setData(PlayingState.PLAYING);
			ModelFacade.getInstance().get(ModelFacade.COMMTICKER).start();
		}
	};
	
  	return DrawCommand;
});

