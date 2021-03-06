define(['phasercomponents',

	'base/utils/message',

	'base/utils/error', 'base/utils/errorcodes',

	'base/utils/translation', 'base/utils/translationconsts'],

function(PhaserComponents,

	Message,

	Error, ErrorCodes,

	Translation, TranslationConsts) {
	
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
			Message.show(this.alertManager, Translation.getForKey(TranslationConsts.Keys.SAVE_SUCCESS));
		}
		else{
			Error.show(this.alertManager, ErrorCodes.SAVE_ERROR);
		}
		this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.FORCE_RESIZE});
	};
	
  	return SaveCommand;
});

