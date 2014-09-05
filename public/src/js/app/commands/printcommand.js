define('app/commands/printcommand',

	['phasercomponents', 'app/components/popups/growl'],

function(PhaserComponents, Growl) {
	
	"use strict";
	
	var PrintCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};
	
	PrintCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	PrintCommand.prototype.constructor = PrintCommand;

	PrintCommand.prototype.execute = function(data){
		PhaserComponents.AlertManager.getInstance().make(Growl, {"label":"No printers found"}, null);
	};
	
  	return PrintCommand;
});
