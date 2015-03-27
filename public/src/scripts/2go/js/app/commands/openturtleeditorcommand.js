define(

	['phasercomponents',

	'base/models/modelconsts'],

function(PhaserComponents,

	ModelConsts) {
	
	"use strict";

	var OpenTurtleEditorCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(OpenTurtleEditorCommand, PhaserComponents.Commands.AbstractCommand);

	OpenTurtleEditorCommand.prototype.onImgSelected = function(base64Data){
		this.modelFacade.get(ModelConsts.TURTLE_PNG).set(base64Data);
	};

	OpenTurtleEditorCommand.prototype.execute = function(){
		this.clipart.openTurtle({"success":this.onImgSelected.bind(this)});
	};
	
  	return OpenTurtleEditorCommand;
});
