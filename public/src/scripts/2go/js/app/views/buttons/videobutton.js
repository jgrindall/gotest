
define(['phasercomponents', 'base/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var VideoButton = function(options){
		var frame0 = 9*4;
		options.frames = [frame0, frame0 + 1, frame0 + 2, frame0 + 3];
		options.asset = Assets.BUTTON;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	VideoButton.WIDTH = 40;
	VideoButton.HEIGHT = 40;
	
	PhaserComponents.Utils.extends(VideoButton, PhaserComponents.Display.AbstractButton);

	return VideoButton;
	
});
