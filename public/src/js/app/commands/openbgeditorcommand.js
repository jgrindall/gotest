define(

	['phasercomponents',

	'app/models/modelconsts'],

function(PhaserComponents,

	ModelConsts) {
	
	"use strict";

	var OpenBgEditorCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(OpenBgEditorCommand, PhaserComponents.Commands.AbstractCommand);

	OpenBgEditorCommand.prototype.onImgSelected = function(base64Data){
		this.modelFacade.get(ModelConsts.BG_PNG).set(base64Data);
	};

	OpenBgEditorCommand.prototype.execute = function(){
		this.clipart.openBg({"success":this.onImgSelected.bind(this)});
	};
	
  	return OpenBgEditorCommand;
});

