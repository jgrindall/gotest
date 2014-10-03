
define(['phasercomponents', 'app/assets'],

	function( PhaserComponents, Assets){
	
	"use strict";
	
	var ControlMenuButton = function(options){
		var frame0;
		options.disabledAlpha = 1;
		options.asset = Assets.BUTTON;
		options.sfx = Assets.SOUNDS[0];
		frame0 = (5 * options.data.num);
		options.frames = [frame0, frame0 + 1, frame0 + 2, frame0 + 3];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	ControlMenuButton.WIDTH = 50;
	ControlMenuButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(ControlMenuButton, PhaserComponents.Display.AbstractButton);

	return ControlMenuButton;
	
});
