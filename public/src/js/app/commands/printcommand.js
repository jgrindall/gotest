define('app/commands/printcommand',

	['phasercomponents', 'app/views/popups/growl', 'app/assets'],

function(PhaserComponents, Growl, Assets) {
	
	"use strict";

	var PrintCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(PrintCommand, PhaserComponents.Commands.AbstractCommand);

	PrintCommand.prototype.execute = function(data){
		PhaserComponents.AlertManager.getInstance().make(Growl, {"title":"Message", "label":"No printers found", "sfx":Assets.SOUNDS[2]}, null);
	};
	
  	return PrintCommand;
});
