
define('app/views/buttons/radiobutton',[ 'phasercomponents', 'app/assets'],

function(PhaserComponents, Assets){
	
	"use strict";
	
	var RadioButton = function(options){
		options.asset = Assets.RADIO;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	RadioButton.WIDTH = 120;
	RadioButton.HEIGHT = 60;

	PhaserComponents.Utils.extends(RadioButton, PhaserComponents.Display.AbstractButton);

	return RadioButton;

});


