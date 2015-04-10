
define(['phasercomponents', 'base/assets',

	'base/utils/translation', 'base/utils/translationconsts'],

	function(PhaserComponents, Assets,

		Translation, TranslationConsts){
	
	"use strict";
	
	var OkButton = function(options){
		options.label = {'key':'medium', 'bounds':{'x':7, 'y':57, 'w':166, 'h':40}, 'text': Translation.getForKey(TranslationConsts.Keys.OK_BUTTON)};
		options.asset = Assets.OK_BUTTON;
		options.sfx = Assets.SOUNDS[1];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	OkButton.WIDTH = 180;
	OkButton.HEIGHT = 100;
	
	PhaserComponents.Utils.extends(OkButton, PhaserComponents.Display.AbstractButton);

	OkButton.prototype.create = function(){
		PhaserComponents.Display.AbstractButton.prototype.create.call(this);
	};

	return OkButton;
	
});

