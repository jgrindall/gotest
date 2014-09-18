define( ['phaser', 'app/consts/progtypes', 'app/logocommands/commandtypes',

	'app/prog/dropview', 'app/consts/proglayout', 'app/assets', 'phasercomponents',

	'app/prog/abstracttarget', 'app/prog/abstractprogcontroller'],

	function(Phaser, ProgTypes, CommandTypes,

		DropView, ProgLayout, Assets, PhaserComponents,

		AbstractTarget, AbstractProgController){
	
	"use strict";

	var ProgController = function(parent){
		AbstractProgController.call(this, parent);
	};

	PhaserComponents.Utils.extends(ProgController, AbstractProgController);

	ProgController.prototype.getAllCommands = function() {
		var that = this, json = this.model.toJson(), hitzone, commands = [], command;
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

