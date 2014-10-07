define(

	['app/models/modelfacade', 'app/consts/playingstate', 'phasercomponents'],

function(ModelFacade, PlayingState, PhaserComponents) {
	
	"use strict";
	
	var DrawCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(DrawCommand, PhaserComponents.Commands.AbstractCommand);

	DrawCommand.prototype.execute = function(){
		var playingModel;
		playingModel = this.modelFacade.get(ModelFacade.PLAYING);
		if(playingModel.get() !== PlayingState.PLAYING){
			playingModel.set(PlayingState.PLAYING);
			this.modelFacade.get(ModelFacade.COMMTICKER).start();
		}
	};
	
  	return DrawCommand;
});

