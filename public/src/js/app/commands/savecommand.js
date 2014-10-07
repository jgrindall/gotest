define(['phasercomponents',

	'app/utils/message',

	'app/utils/error', 'app/utils/errorcodes'],

function(PhaserComponents,

	Message,

	Error, ErrorCodes) {
	
	"use strict";
	
	var SaveCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(SaveCommand, PhaserComponents.Commands.AbstractCommand);

	SaveCommand.prototype.execute = function(){
		var json = this.modelFacade.getJson();
		this.storage.saveForKeyPath(null, json, this.onSaved.bind(this));
	};
	
	SaveCommand.prototype.onSaved = function(data){
		if(data.success){
			Message.show(this.alertManager, Message.SAVE_SUCCESS);
		}
		else{
			Error.show(this.alertManager, ErrorCodes.SAVE_ERROR);
		}
	};
	
  	return SaveCommand;
});

