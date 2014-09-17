define(

	['app/prog/abstractprogcommandpanel', 'phasercomponents', 'app/logocommands/commandtypes'],

	function(AbstractProgCommandPanel, PhaserComponents, CommandTypes){
	
	"use strict";

	var KeysProgCommandsPanel = function(options){
		AbstractProgCommandPanel.call(this, options);
	};

	PhaserComponents.Utils.extends(KeysProgCommandsPanel, AbstractProgCommandPanel);

	KeysProgCommandsPanel.prototype.isFull = function(hitZoneRow) {
		var hitZone0, hitZone1;
		hitZone0 = hitZoneRow[0];
		hitZone1 = hitZoneRow[1];
		return ( (typeof hitZone0.type === 'number') && (typeof hitZone1.type === 'number'));
	};

	KeysProgCommandsPanel.prototype.addAllCommands = function() {
		var that = this, json = this.model.toJson(), hitzone0, hitzone1;
		json.forEach(function(hitZoneRow){
			hitzone0 = hitZoneRow[0];
			hitzone1 = hitZoneRow[1];
			if(hitzone0 && hitzone0.type === 0 && hitzone1 && hitzone1.type === 1){
				that.addCommands(hitzone0.index, CommandTypes.MOVE, hitzone1.index + 1);
			}
		});
	};

	return KeysProgCommandsPanel;
});
