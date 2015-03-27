
define([ 'phasercomponents', 'base/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var ControlBarButton = function(options){
		var frame0;
		options.asset = Assets.CONTROL_BAR;
		options.sfx = Assets.SOUNDS[0];
		frame0 = (4 * options.data.num);
		options.frames = [frame0, frame0 + 1, frame0 + 2, frame0 + 3];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	ControlBarButton.WIDTH = 50;
	ControlBarButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(ControlBarButton, PhaserComponents.Display.AbstractButton);

	return ControlBarButton;
	
});
