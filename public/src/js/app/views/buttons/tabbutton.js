
define([ 'phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var TabButton = function(options){
		var frame0;
		options.asset = Assets.TAB_BUTTON;
		options.sfx = Assets.SOUNDS[0];
		frame0 = (4 * options.data.num);
		options.frames = [frame0, frame0 + 1, frame0 + 2, frame0 + 3];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	TabButton.WIDTH = 100;
	TabButton.HEIGHT = 30;
	
	PhaserComponents.Utils.extends(TabButton, PhaserComponents.Display.AbstractButton);

	return TabButton;
	
});
