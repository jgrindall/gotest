define('app/commands/stopcommand',

	['app/models/modelfacade', 'app/consts/playingstate', 'app/commands/abstractcommand'],

function(ModelFacade, PlayingState, AbstractCommand) {
	
	"use strict";
	
	var StopCommand = function(){
		AbstractCommand.call(this);
	};
	
	StopCommand.prototype = Object.create(AbstractCommand.prototype);
	StopCommand.prototype.constructor = StopCommand;

	StopCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.COMM).stop();
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).reset();
		ModelFacade.getInstance().get(ModelFacade.PLAYING).setData(PlayingState.NOT_PLAYING);
	};
	
  	return StopCommand;
});

