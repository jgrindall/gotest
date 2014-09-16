define('app/prog/progcommandspanel',

	['app/prog/abstractprogcommandpanel', 'phasercomponents'],

	function(AbstractProgCommandPanel, PhaserComponents){
	
	"use strict";

	var ProgCommandsPanel = function(options){
		AbstractProgCommandPanel.call(this, options);
	};

	PhaserComponents.Utils.extends(ProgCommandsPanel, AbstractProgCommandPanel);

	return ProgCommandsPanel;
});

