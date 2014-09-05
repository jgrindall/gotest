
define('app/views/components/colorpicker',['phasercomponents'

],

function(PhaserComponents){
	
	"use strict";
	
	var ColorPicker  = function(options){
		PhaserComponents.MultiButton.call(this, options);
	};

	ColorPicker.WIDTH = 160;
	ColorPicker.HEIGHT = 80;
	
	ColorPicker.prototype = Object.create(PhaserComponents.MultiButton.prototype);
	ColorPicker.prototype.constructor = ColorPicker;
	
	return ColorPicker;
});
	
	
