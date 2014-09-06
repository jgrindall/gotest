define('app/commands/drawcommand',

	['app/models/modelfacade', 'app/consts/playingstate', 'phasercomponents'],

function(ModelFacade, PlayingState, PhaserComponents) {
	
	"use strict";
	
	var DrawCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};
	
	DrawCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	DrawCommand.prototype.constructor = DrawCommand;

	DrawCommand.prototype.execute = function(data){
		var playingModel;
		playingModel = ModelFacade.getInstance().get(ModelFacade.PLAYING);
		if(playingModel.get() !== PlayingState.PLAYING){
			playingModel.set(PlayingState.PLAYING);
			ModelFacade.getInstance().get(ModelFacade.COMMTICKER).start();
		}
	};
	
  	return DrawCommand;
});

