
define('app/views/controls/radiobuttons',['phasercomponents'

],

function(PhaserComponents

){
	
	"use strict";
	
	var RadioButtons  = function(options){
		options.numX = 1;
		//TODO - add text and move to phasercomponents
		PhaserComponents.ButtonBar.call(this, options);
	};
	
	RadioButtons.WIDTH = 120;
	RadioButtons.HEIGHT = 120;

	Utils.extend(RadioButtons, PhaserComponents.ButtonBar);

	return RadioButtons;

});
	
