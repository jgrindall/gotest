
define(

	['phasercomponents', 'base/assets',

	'base/utils/translation', 'base/utils/translationconsts'],

	function(PhaserComponents, Assets,

		Translation, TranslationConsts){
	
	"use strict";
	
	var PlayButton = function(options){
		options.disabledAlpha = 1;
		options.asset = Assets.PLAY_BUTTON;
		options.label = {'key':'button', 'bounds':{'x':2, 'y':15, 'w':80, 'h':40}, 'text':Translation.getForKey(TranslationConsts.Keys.PLAY_BUTTON)};
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	PlayButton.WIDTH = 100;
	PlayButton.HEIGHT = 50;

	PhaserComponents.Utils.extends(PlayButton, PhaserComponents.Display.AbstractButton);

	PlayButton.prototype.enableInput = function(){
		PhaserComponents.Display.AbstractButton.prototype.enableInput.call(this);
		this.goToFrame(0);
	};
	
	PlayButton.prototype.disableInput = function(){
		PhaserComponents.Display.AbstractButton.prototype.disableInput.call(this);
		this.goToFrame(3);
	};


	return PlayButton;

});









