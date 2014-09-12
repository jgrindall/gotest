
define(['phasercomponents', 'app/assets'],

	function( PhaserComponents, Assets){
	
	"use strict";
	
	var ControlMenuButton = function(options){
		var frame0;
		options.asset = Assets.BUTTON;
		frame0 = (4 * options.data.num);
		options.frames = [frame0, frame0 + 1, frame0 + 2, frame0 + 3];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	ControlMenuButton.WIDTH = 50;
	ControlMenuButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(ControlMenuButton, PhaserComponents.Display.AbstractButton);

	return ControlMenuButton;
	
});
