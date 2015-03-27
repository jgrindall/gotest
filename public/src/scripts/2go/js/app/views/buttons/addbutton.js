
define(['phasercomponents', 'base/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var AddButton = function(options){
		options.asset = Assets.ADD_BUTTON;
		options.sfx = Assets.SOUNDS[1];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	AddButton.WIDTH = 180;
	AddButton.HEIGHT = 70;
	
	PhaserComponents.Utils.extends(AddButton, PhaserComponents.Display.AbstractButton);

	return AddButton;
	
});

