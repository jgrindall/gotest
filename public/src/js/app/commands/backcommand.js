define(

	['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var BackCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(BackCommand, PhaserComponents.Commands.AbstractCommand);

	BackCommand.prototype.execute = function(){
		if(window.closeApplication && typeof window.closeApplication === 'function'){
			window.closeApplication();
		}
		else{
			console.log("window.closeApplication is "+window.closeApplication);
			//window.history.back();
		}
	};
	
  	return BackCommand;
});
