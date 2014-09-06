define('app/commands/gridchoicecommand',

	['phasercomponents', 'app/views/popups/gridmenu'],

function(PhaserComponents, GridMenu) {
	
	"use strict";
	
	var GridChoiceCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(GridChoiceCommand, PhaserComponents.Commands.AbstractCommand);

	GridChoiceCommand.prototype.execute = function(data){
		PhaserComponents.AlertManager.getInstance().make(GridMenu, {}, null); 
	};
	
  	return GridChoiceCommand;
});


	