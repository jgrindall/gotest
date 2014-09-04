
define('app/views/components/widthpicker',['app/components/buttons/stepperbutton'

],

function(StepperButton){
	
	"use strict";
	
	var WidthPicker  = function(options){
		StepperButton.call(this, options);
	};

	WidthPicker.WIDTH = 80;
	WidthPicker.HEIGHT = 80;
	
	WidthPicker.prototype = Object.create(StepperButton.prototype);
	WidthPicker.prototype.constructor = WidthPicker;
	
	return WidthPicker;
});
	
	
