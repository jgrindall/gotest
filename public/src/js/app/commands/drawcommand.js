define('app/commands/drawcommand',

	['app/models/modelfacade', 'app/consts/playingstate', 'phasercomponents'],

function(ModelFacade, PlayingState, PhaserComponents) {
	
	"use strict";
	
	var DrawCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(DrawCommand, PhaserComponents.Commands.AbstractCommand);

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

