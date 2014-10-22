
define(['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var ClearButton = function(options){
		options.asset = Assets.CLEAR;
		options.sfx = Assets.SOUNDS[1];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	ClearButton.WIDTH = 50;
	ClearButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(ClearButton, PhaserComponents.Display.AbstractButton);

	return ClearButton;
	
});

