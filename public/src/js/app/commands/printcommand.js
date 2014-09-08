define('app/commands/printcommand',

	['phasercomponents', 'app/views/popups/growl'],

function(PhaserComponents, Growl) {
	
	"use strict";

	var PrintCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(PrintCommand, PhaserComponents.Commands.AbstractCommand);

	PrintCommand.prototype.execute = function(data){
		PhaserComponents.AlertManager.getInstance().make(Growl, {"label":"No printers found"}, null);
	};
	
  	return PrintCommand;
});
