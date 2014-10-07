define(

	['phasercomponents', 'app/views/popups/gridmenu', 'app/assets'],

function(PhaserComponents, GridMenu, Assets) {
	
	"use strict";
	
	var GridChoiceCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(GridChoiceCommand, PhaserComponents.Commands.AbstractCommand);

	GridChoiceCommand.prototype.execute = function(){
		var options = {"label":"Settings", "sfx":Assets.SOUNDS[2]};
		this.alertManager.make(GridMenu, options, null); 
	};
	
  	return GridChoiceCommand;
});


	