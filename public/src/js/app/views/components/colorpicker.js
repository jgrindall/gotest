
define('app/views/components/colorpicker',['phasercomponents'

],

function(PhaserComponents){
	
	"use strict";
	
	var ColorPicker  = function(options){
		PhaserComponents.Display.MultiButton.call(this, options);
	};

	ColorPicker.WIDTH = 235;
	ColorPicker.HEIGHT = 125;
	
	PhaserComponents.Utils.extends(ColorPicker, PhaserComponents.Display.MultiButton);

	ColorPicker.prototype.onChanged = function(value){
		if(value === null){
			// go to frame 0
			PhaserComponents.Display.MultiButton.prototype.onChanged.call(this, 0);
		}
		else{
			// go to frame + 1
			PhaserComponents.Display.MultiButton.prototype.onChanged.call(this, value + 1);
		}
	};

	return ColorPicker;
});
	
	
