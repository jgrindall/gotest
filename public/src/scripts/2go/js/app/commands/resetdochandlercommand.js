define(

	['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var ResetDocHandlerCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ResetDocHandlerCommand, PhaserComponents.Commands.AbstractCommand);

	ResetDocHandlerCommand.prototype.execute = function(){
		if(window.DocumentHandler && window.DocumentHandler.reset){
			console.log("reset DocumentHandler");
			window.DocumentHandler.reset();
		}
	};
	
  	return ResetDocHandlerCommand;
});

