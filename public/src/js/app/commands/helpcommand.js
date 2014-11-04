define(['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var HelpCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(HelpCommand, PhaserComponents.Commands.AbstractCommand);

	HelpCommand.prototype.execute = function(){
		window.alert("help");
	};
	
  	return HelpCommand;
});
