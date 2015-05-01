define(

	['phasercomponents',

	'base/events/events',

	'base/models/modelconsts'],

function(PhaserComponents,

	Events,

	ModelConsts) {
	
	"use strict";

	var OpenBgEditorCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(OpenBgEditorCommand, PhaserComponents.Commands.AbstractCommand);

	OpenBgEditorCommand.prototype.onImgSelected = function(base64Data){
		this.modelFacade.get(ModelConsts.CHALLENGE).reset();
		this.modelFacade.get(ModelConsts.BG_PNG).set(base64Data);
		this.eventDispatcher.trigger({"type":Events.RESET_DOC_HANDLER});
	};

	OpenBgEditorCommand.prototype.execute = function(){
		this.clipart.openBg({"success":this.onImgSelected.bind(this)});
	};
	
  	return OpenBgEditorCommand;
});

