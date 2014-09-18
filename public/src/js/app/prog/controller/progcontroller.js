define( ['app/logocommands/commandtypes',

	'phasercomponents',

	'app/prog/controller/abstractprogcontroller'],

	function(CommandTypes,

		PhaserComponents,

		AbstractProgController){
	
	"use strict";

	var ProgController = function(parent){
		AbstractProgController.call(this, parent);
	};

	PhaserComponents.Utils.extends(ProgController, AbstractProgController);

	ProgController.prototype.getAllCommands = function() {
		var json = this.model.toJson(), hitzone, commands = [], command;
		json.forEach(function(hitZoneRow){
			hitzone = hitZoneRow[0];
			if(hitzone && hitzone.type === 0){
				command = {'type':CommandTypes.MOVE, 'direction':hitzone.index, 'total':1};
				commands.push(command);
			}
			else{
				commands.push(null);
			}
		});
		return commands;
	};

	return ProgController;
});

