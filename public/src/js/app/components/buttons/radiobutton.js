
define('app/components/buttons/radiobutton',[ 'phasercomponents', 'app/assets'],

function(PhaserComponents, Assets){
	
	"use strict";
	
	var RadioButton = function(options){
		options.asset = Assets.RADIOBUTTON;
		PhaserComponents.AbstractButton.call(this, options);
	};

	RadioButton.WIDTH = 120;
	RadioButton.HEIGHT = 60;

	RadioButton.prototype = Object.create(PhaserComponents.AbstractButton.prototype);
	RadioButton.prototype.constructor = RadioButton;

	return RadioButton;

});


