
define(['phasercomponents', 'base/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var ChallengeButton = function(options){
		options.asset = Assets.CHALLENGE_BUTTON;
		options.sfx = Assets.SOUNDS[1];
		options.label = {'key':'button', 'bounds':{'x':63, 'y':24, 'w':88, 'h':40}, 'text':'Challenges'};
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	ChallengeButton.WIDTH = 180;
	ChallengeButton.HEIGHT = 70;
	
	PhaserComponents.Utils.extends(ChallengeButton, PhaserComponents.Display.AbstractButton);

	return ChallengeButton;
	
});

