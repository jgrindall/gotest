
define(['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var VoiceOverButton = function(options){
		options.asset = Assets.VOICEOVER;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	VoiceOverButton.WIDTH = 50;
	VoiceOverButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(VoiceOverButton, PhaserComponents.Display.AbstractButton);

	return VoiceOverButton;
	
});

