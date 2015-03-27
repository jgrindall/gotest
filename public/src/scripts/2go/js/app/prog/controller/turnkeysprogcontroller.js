define( ['phasercomponents', 'base/prog/controller/abstractprogcontroller', 'base/logocommands/commandtypes'],

	function(PhaserComponents, AbstractProgController, CommandTypes){
	
	"use strict";

	var TurnKeysProgController = function(parent){
		AbstractProgController.call(this, parent);
	};

	PhaserComponents.Utils.extends(TurnKeysProgController, AbstractProgController);

	TurnKeysProgController.prototype.getAllCommands = function() {
		var type, json = this.model.toJson(), hitzone0, hitzone1, commands = [], command;
		json.forEach(function(hitZoneRow){
			hitzone0 = hitZoneRow[0];
			hitzone1 = hitZoneRow[1];
			if(hitzone0 && hitzone0.type === 0 && hitzone1 && hitzone1.type === 1){
				if(hitzone0.index === 3 || hitzone0.index === 5){
					type = CommandTypes.TURN;
				}
				else{
					type = CommandTypes.FD;
				}
				command = {'type':type, 'direction':hitzone0.index, 'total':hitzone1.index + 1};
				commands.push(command);
			}
		});
		return commands;
	};
	
	return TurnKeysProgController;
});

