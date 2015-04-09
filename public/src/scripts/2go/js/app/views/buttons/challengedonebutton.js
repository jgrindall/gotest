
define(['phasercomponents', 'base/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var ChallengeDoneButton = function(options){
		options.asset = Assets.CHALLENGE_BUTTON;
		options.sfx = Assets.SOUNDS[1];
		options.label = {'key':'button', 'bounds':{'x':63, 'y':24, 'w':88, 'h':40}, 'text':"Try another"};
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	ChallengeDoneButton.WIDTH = 180;
	ChallengeDoneButton.HEIGHT = 70;
	
	PhaserComponents.Utils.extends(ChallengeDoneButton, PhaserComponents.Display.AbstractButton);

	return ChallengeDoneButton;
	
});

