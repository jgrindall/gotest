define(['app/models/modelfacade', 

	'phasercomponents', 'app/events/events',

	'app/utils/errorcodes', 'app/utils/error', 'app/utils/message'],

function(ModelFacade,

	PhaserComponents, Events,

	ErrorCodes, Error, Message) {
	
	"use strict";
	
	var LoadCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(LoadCommand, PhaserComponents.Commands.AbstractCommand);

	LoadCommand.prototype.execute = function(){
		PhaserComponents.Storage.Storage.getInstance().getForKeyPath(null, this.onLoaded.bind(this));
	};
	
	LoadCommand.prototype.onLoaded = function(data){
		if(data.success){
			try{
				ModelFacade.getInstance().setData(data.response);
				this.eventDispatcher.trigger({"type":Events.REPLAY});
				Message.show(Message.LOAD_SUCCESS);
			}
			catch(e){
				Error.show(ErrorCodes.FORMAT_ERROR);
			}
		}
		else{
			Error.show(ErrorCodes.LOAD_ERROR);
		}
	};
	
  	return LoadCommand;
});
