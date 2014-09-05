
define('app/views/components/widthpicker',['phasercomponents'

],

function(PhaserComponents){
	
	"use strict";
	
	var WidthPicker  = function(options){
		PhaserComponents.StepperButton.call(this, options);
	};

	WidthPicker.WIDTH = 80;
	WidthPicker.HEIGHT = 80;
	
	WidthPicker.prototype = Object.create(PhaserComponents.StepperButton.prototype);
	WidthPicker.prototype.constructor = WidthPicker;
	
	return WidthPicker;
});
	
	
