define('app/commands/gridchoicecommand',

	['phasercomponents', 'app/views/popups/gridmenu'],

function(PhaserComponents, GridMenu) {
	
	"use strict";
	
	var GridChoiceCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};
	
	GridChoiceCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	GridChoiceCommand.prototype.constructor = GridChoiceCommand;

	GridChoiceCommand.prototype.execute = function(data){
		PhaserComponents.AlertManager.getInstance().make(GridMenu, {}, null); 
	};
	
  	return GridChoiceCommand;
});


	