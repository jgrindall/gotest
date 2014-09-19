
define(

	['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var NextButton = function(options){
		options.asset = Assets.NEXT_BUTTON;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	NextButton.WIDTH = 180;
	NextButton.HEIGHT = 70;

	PhaserComponents.Utils.extends(NextButton, PhaserComponents.Display.AbstractButton);

	return NextButton;

});
