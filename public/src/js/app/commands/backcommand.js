define(

	['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var BackCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(BackCommand, PhaserComponents.Commands.AbstractCommand);

	BackCommand.prototype.execute = function(){
		window.alert("back");
		window.history.back();
	};
	
  	return BackCommand;
});