
define('app/components/buttons/togglebutton',['app/components/buttons/stepperbutton'],

function(StepperButton){
	
	"use strict";
	
	var ToggleButton = function(options){
		options.num = 2;
		options.asset = 'toggle';
		StepperButton.call(this, options);
	};

	ToggleButton.WIDTH = 120;
	ToggleButton.HEIGHT = 60;

	ToggleButton.prototype = Object.create(StepperButton.prototype);
	ToggleButton.prototype.constructor = ToggleButton;

	return ToggleButton;

});


