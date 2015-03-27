
define(

	['phasercomponents', 'base/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var StartButton = function(options){
		options.asset = Assets.START_BUTTON;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	StartButton.WIDTH = 180;
	StartButton.HEIGHT = 70;

	PhaserComponents.Utils.extends(StartButton, PhaserComponents.Display.AbstractButton);

	return StartButton;

});
