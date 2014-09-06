
define('app/components/buttons/okbutton',[ 'phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var OkButton = function(options){
		options.asset = Assets.OK_BUTTON;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	OkButton.WIDTH = 250;
	OkButton.HEIGHT = 75;
	
	PhaserComponents.Utils.extends(OkButton, PhaserComponents.Display.AbstractButton);

	return OkButton;
	
});

