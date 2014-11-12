define(['phasercomponents', 'app/events/events',

	'app/utils/errorcodes', 'app/utils/error', 'app/utils/message'],

function(PhaserComponents, Events,

	ErrorCodes, Error, Message) {
	
	"use strict";
	
	var LoadCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(LoadCommand, PhaserComponents.Commands.AbstractCommand);

	LoadCommand.prototype.execute = function(){
		this.storage.getForKeyPath(null, this.onLoaded.bind(this));
	};
	
	LoadCommand.prototype.onLoaded = function(data){
		var code;
		if(data.success){
			if(data.response){
				try{
					this.modelFacade.setData(data.response);
					this.eventDispatcher.trigger({"type":Events.REPLAY});
					Message.show(this.alertManager, Message.LOAD_SUCCESS);
				}
				catch(e){
					Error.show(this.alertManager, ErrorCodes.FORMAT_ERROR);
				}
			}
			else{
				Error.show(this.alertManager, ErrorCodes.FILE_NOT_FOUND);
			}
		}
		else{
			code = data.response;
			if(code === null || code === undefined){
				code = ErrorCodes.LOAD_ERROR;
			}
			Error.show(this.alertManager, code);
		}
	};
	
  	return LoadCommand;
});

