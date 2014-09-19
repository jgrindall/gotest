
define(

	['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var SkipButton = function(options){
		options.asset = Assets.SKIP_BUTTON;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	SkipButton.WIDTH = 180;
	SkipButton.HEIGHT = 70;

	PhaserComponents.Utils.extends(SkipButton, PhaserComponents.Display.AbstractButton);

	return SkipButton;

});









