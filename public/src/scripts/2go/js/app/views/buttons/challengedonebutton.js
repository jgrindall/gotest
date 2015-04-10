
define(['phasercomponents', 'base/assets',

	'base/utils/translation', 'base/utils/translationconsts'],

	function(PhaserComponents, Assets,

		Translation, TranslationConsts){
	
	"use strict";
	
	var ChallengeDoneButton = function(options){
		options.asset = Assets.CHALLENGE_BUTTON;
		options.sfx = Assets.SOUNDS[1];
		options.label = {'key':'button', 'bounds':{'x':63, 'y':24, 'w':88, 'h':40}, 'text':Translation.getForKey(TranslationConsts.Keys.TRY_ANOTHER_BUTTON)};
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	ChallengeDoneButton.WIDTH = 180;
	ChallengeDoneButton.HEIGHT = 70;
	
	PhaserComponents.Utils.extends(ChallengeDoneButton, PhaserComponents.Display.AbstractButton);

	return ChallengeDoneButton;
	
});

