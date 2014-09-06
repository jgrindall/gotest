
define('app/views/components/colorpicker',['phasercomponents'

],

function(PhaserComponents){
	
	"use strict";
	
	var ColorPicker  = function(options){
		PhaserComponents.Display.MultiButton.call(this, options);
	};

	ColorPicker.WIDTH = 160;
	ColorPicker.HEIGHT = 80;
	
	ColorPicker.prototype = Object.create(PhaserComponents.Display.MultiButton.prototype);
	ColorPicker.prototype.constructor = ColorPicker;
	
	return ColorPicker;
});
	
	
