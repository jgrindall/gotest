
define(['phasercomponents', 'base/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var ChallengeDoneButton = function(options){
		options.asset = Assets.CHALLENGE_DONE_BUTTON;
		options.sfx = Assets.SOUNDS[1];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	ChallengeDoneButton.WIDTH = 180;
	ChallengeDoneButton.HEIGHT = 70;
	
	PhaserComponents.Utils.extends(ChallengeDoneButton, PhaserComponents.Display.AbstractButton);

	return ChallengeDoneButton;
	
});

