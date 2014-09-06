
define('app/views/components/colorpicker',['phasercomponents'

],

function(PhaserComponents){
	
	"use strict";
	
	var ColorPicker  = function(options){
		PhaserComponents.Display.MultiButton.call(this, options);
	};

	ColorPicker.WIDTH = 160;
	ColorPicker.HEIGHT = 80;
	
	PhaserComponents.Utils.extends(ColorPicker, PhaserComponents.Display.MultiButton);

	return ColorPicker;
});
	
	
