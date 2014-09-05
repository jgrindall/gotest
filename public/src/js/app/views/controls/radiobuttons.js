
define('app/views/controls/radiobuttons',[ 'app/components/buttons/radiobutton',

'phasercomponents'

],

function(RadioButton,

PhaserComponents

){
	
	"use strict";
	
	var RadioButtons  = function(options){
		options.buttonClass = RadioButton;
		options.numX = 1;
		options.numY = 2;
		PhaserComponents.ButtonBar.call(this, options);
	};
	
	RadioButtons.WIDTH = 120;
	RadioButtons.HEIGHT = 120;

	RadioButtons.prototype = Object.create(PhaserComponents.ButtonBar.prototype);
	RadioButtons.prototype.constructor = RadioButtons;
	
	return RadioButtons;

});
	
