
define(['phasercomponents', 'base/assets'],

function(PhaserComponents, Assets){
	
	"use strict";
	
	var RadioButton = function(options){
		options.asset = Assets.RADIO;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	RadioButton.WIDTH = 100;
	RadioButton.HEIGHT = 40;

	PhaserComponents.Utils.extends(RadioButton, PhaserComponents.Display.AbstractButton);

	return RadioButton;

});


