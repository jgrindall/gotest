define(

	['app/prog/abstractprogcommandpanel', 'phasercomponents', 'app/logocommands/commandtypes'],

	function(AbstractProgCommandPanel, PhaserComponents, CommandTypes){
	
	"use strict";

	var ProgCommandsPanel = function(options){
		AbstractProgCommandPanel.call(this, options);
	};

	PhaserComponents.Utils.extends(ProgCommandsPanel, AbstractProgCommandPanel);

	ProgCommandsPanel.prototype.isFull = function(hitZoneRow) {
		var hitZone0;
		hitZone0 = hitZoneRow[0];
		return (typeof hitZone0.type === 'number');
	};

	ProgCommandsPanel.prototype.addAllCommands = function() {
		var that = this, json = this.model.toJson(), hitzone;
		json.forEach(function(hitZoneRow){
			hitzone = hitZoneRow[0];
			if(hitzone && hitzone.type === 0){
				that.addCommand(hitzone.index, CommandTypes.MOVE);
			}
		});
	};

	return ProgCommandsPanel;
});

