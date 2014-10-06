define(['phasercomponents',

	'app/models/modelfacade', 'app/utils/message',

	'app/utils/error', 'app/utils/errorcodes'],

function(PhaserComponents,

	ModelFacade, Message,

	Error, ErrorCodes) {
	
	"use strict";
	
	var SaveCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(SaveCommand, PhaserComponents.Commands.AbstractCommand);

	SaveCommand.prototype.execute = function(){
		var json = ModelFacade.getInstance().getJson();
		PhaserComponents.Storage.Storage.getInstance().saveForKeyPath(null, json, this.onSaved.bind(this));
	};
	
	SaveCommand.prototype.onSaved = function(data){
		if(data.success){
			Message.show(Message.SAVE_SUCCESS);
		}
		else{
			Error.show(ErrorCodes.SAVE_ERROR);
		}
	};
	
  	return SaveCommand;
});

