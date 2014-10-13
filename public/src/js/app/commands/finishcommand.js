define(

	['app/consts/playingstate',

	'phasercomponents', 'app/models/modelconsts'],

function(PlayingState, 
	
	PhaserComponents, ModelConsts) {
	
	"use strict";
	
	var FinishCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(FinishCommand, PhaserComponents.Commands.AbstractCommand);

	FinishCommand.prototype.execute = function(){
		this.modelFacade.get(ModelConsts.PLAYING).set(PlayingState.NOT_PLAYING);
	};
	
  	return FinishCommand;
});
