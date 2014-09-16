define('app/prog/turnkeysprogcommandspanel',

	['app/prog/keysprogcommandspanel', 'phasercomponents', 'app/logocommands/commandtypes'],

	function(KeysProgCommandPanel, PhaserComponents, CommandTypes){
	
	"use strict";

	var TurnKeysProgCommandsPanel = function(options){
		KeysProgCommandPanel.call(this, options);
	};

	PhaserComponents.Utils.extends(TurnKeysProgCommandsPanel, KeysProgCommandPanel);

	TurnKeysProgCommandsPanel.prototype.addAllCommands = function() {
		var that = this, type, json = this.model.toJson(), hitzone0, hitzone1;
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
				that.addCommands(hitzone0.index, type, hitzone1.index + 1);
			}
		});
	};
	return TurnKeysProgCommandsPanel;
});


