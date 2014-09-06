
define('app/views/components/widthpicker',['phasercomponents'

],

function(PhaserComponents){
	
	"use strict";
	
	var WidthPicker  = function(options){
		PhaserComponents.Display.StepperButton.call(this, options);
	};

	WidthPicker.WIDTH = 80;
	WidthPicker.HEIGHT = 80;
	
	PhaserComponents.Utils.extends(WidthPicker, PhaserComponents.Display.StepperButton);
	
	return WidthPicker;
});
	
	
