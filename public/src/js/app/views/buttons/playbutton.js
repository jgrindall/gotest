
define(

	['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var PlayButton = function(options){
		var frame0;
		options.asset = Assets.BUTTON;
		frame0 = 32;
		options.frames = [frame0, frame0 + 1, frame0 + 2, frame0 + 3];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	PhaserComponents.Utils.extends(PlayButton, PhaserComponents.Display.AbstractButton);

	return PlayButton;

});









