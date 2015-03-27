define(

	['base/models/modelconsts', 'base/consts/playingstate', 'phasercomponents'],

function(ModelConsts, PlayingState, PhaserComponents) {
	
	"use strict";
	
	var DrawCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(DrawCommand, PhaserComponents.Commands.AbstractCommand);

	DrawCommand.prototype.execute = function(){
		var playingModel;
		playingModel = this.modelFacade.get(ModelConsts.PLAYING);
		if(playingModel.get() !== PlayingState.PLAYING){
			playingModel.set(PlayingState.PLAYING);
			this.modelFacade.get(ModelConsts.COMMTICKER).start();
		}
	};
	
  	return DrawCommand;
});

