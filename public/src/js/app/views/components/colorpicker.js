
define('app/views/components/colorpicker',['app/components/buttons/multibutton'

],

function(MultiButton){
	
	"use strict";
	
	var ColorPicker  = function(options){
		MultiButton.call(this, options);
	};

	ColorPicker.WIDTH = 160;
	ColorPicker.HEIGHT = 80;
	
	ColorPicker.prototype = Object.create(MultiButton.prototype);
	ColorPicker.prototype.constructor = ColorPicker;
	
	return ColorPicker;
});
	
	
