define( ['phaser', 'app/consts/progtypes',

	'app/prog/dropview', 'app/consts/proglayout', 'app/assets', 'phasercomponents',

	'app/prog/abstracttarget', 'app/prog/abstractprogcontroller', 'app/logocommands/commandtypes'],

	function(Phaser, ProgTypes,

		DropView, ProgLayout, Assets, PhaserComponents,

		AbstractTarget, AbstractProgController, CommandTypes){
	
	"use strict";

	var KeysProgController = function(parent){
		AbstractProgController.call(this, parent);
	};

	PhaserComponents.Utils.extends(KeysProgController, AbstractProgController);

	KeysProgController.prototype.getAllCommands = function() {
		var that = this, json = this.model.toJson(), hitzone0, hitzone1, commands = [], command;
		json.forEach(function(hitZoneRow){
			hitzone0 = hitZoneRow[0];
			hitzone1 = hitZoneRow[1];
			if(hitzone0 && hitzone0.type === 0 && hitzone1 && hitzone1.type === 1){
				command = {'type':CommandTypes.MOVE, 'direction':hitzone0.index, 'total':hitzone1.index + 1};
				commands.push(command);
			}
		});
		return commands;
	};
	
	return KeysProgController;
});
