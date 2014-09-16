
define(

	['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var PlayButton = function(options){
		options.asset = Assets.PLAY_BUTTON;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	PlayButton.WIDTH = 100;
	PlayButton.HEIGHT = 50;

	PhaserComponents.Utils.extends(PlayButton, PhaserComponents.Display.AbstractButton);

	return PlayButton;

});









