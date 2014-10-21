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
		var was = this.modelFacade.get(ModelConsts.BG_PNG).get();
		console.log("bg command", base64Data);
		console.log("was", was);
		console.log(base64Data === was);
		this.modelFacade.get(ModelConsts.BG_PNG).set(base64Data);
	};

	OpenBgEditorCommand.prototype.execute = function(){
		this.clipart.openBg({"success":this.onImgSelected.bind(this)});
	};
	
  	return OpenBgEditorCommand;
});

