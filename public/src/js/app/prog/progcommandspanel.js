define('app/prog/progcommandspanel',

	['app/prog/abstractprogcommandpanel', 'phasercomponents', 'app/logocommands/commandtypes'],

	function(AbstractProgCommandPanel, PhaserComponents, CommandTypes){
	
	"use strict";

	var ProgCommandsPanel = function(options){
		AbstractProgCommandPanel.call(this, options);
	};

	PhaserComponents.Utils.extends(ProgCommandsPanel, AbstractProgCommandPanel);

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

