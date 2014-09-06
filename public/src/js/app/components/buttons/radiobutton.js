
define('app/components/buttons/radiobutton',[ 'phasercomponents', 'app/assets'],

function(PhaserComponents, Assets){
	
	"use strict";
	
	var RadioButton = function(options){
		options.asset = Assets.RADIO;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	RadioButton.WIDTH = 120;
	RadioButton.HEIGHT = 60;

	RadioButton.prototype = Object.create(PhaserComponents.Display.AbstractButton.prototype);
	RadioButton.prototype.constructor = RadioButton;

	return RadioButton;

});


