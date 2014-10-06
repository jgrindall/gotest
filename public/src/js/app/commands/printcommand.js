define(

	['phasercomponents', 'app/utils/errorcodes'],

function(PhaserComponents, ErrorCodes) {
	
	"use strict";

	var PrintCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(PrintCommand, PhaserComponents.Commands.AbstractCommand);

	PrintCommand.prototype.execute = function(){
		Error.show(ErrorCodes.NO_PRINTERS);
	};
	
  	return PrintCommand;
});
