
define('app/views/components/widthpicker',['phasercomponents'

],

function(PhaserComponents){
	
	"use strict";
	
	var WidthPicker  = function(options){
		PhaserComponents.Display.StepperButton.call(this, options);
	};

	WidthPicker.WIDTH = 80;
	WidthPicker.HEIGHT = 80;
	
	WidthPicker.prototype = Object.create(PhaserComponents.Display.StepperButton.prototype);
	WidthPicker.prototype.constructor = WidthPicker;
	
	return WidthPicker;
});
	
	
