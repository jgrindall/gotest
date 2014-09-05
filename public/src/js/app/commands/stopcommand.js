define('app/commands/stopcommand',

	['app/models/modelfacade', 'app/consts/playingstate', 'phasercomponents'],

function(ModelFacade, PlayingState, PhaserComponents) {
	
	"use strict";
	
	var StopCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};
	
	StopCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	StopCommand.prototype.constructor = StopCommand;

	StopCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.COMM).stop();
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).reset();
		ModelFacade.getInstance().get(ModelFacade.PLAYING).setData(PlayingState.NOT_PLAYING);
	};
	
  	return StopCommand;
});

