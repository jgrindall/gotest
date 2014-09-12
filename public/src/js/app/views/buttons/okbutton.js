
define([ 'phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var OkButton = function(options){
		options.asset = Assets.OK_BUTTON;
		options.sfx = Assets.SOUNDS[1];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	OkButton.WIDTH = 180;
	OkButton.HEIGHT = 70;
	
	PhaserComponents.Utils.extends(OkButton, PhaserComponents.Display.AbstractButton);

	return OkButton;
	
});

