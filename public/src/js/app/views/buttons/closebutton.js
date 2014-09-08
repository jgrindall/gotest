
define('app/views/buttons/closebutton',[ 'phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var CloseButton = function(options){
		options.asset = Assets.CLOSE;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	CloseButton.WIDTH = 50;
	CloseButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(CloseButton, PhaserComponents.Display.AbstractButton);

	return CloseButton;
	
});

