
define(['app/components/buttons/multibutton',

'app/models/colormodel'

],

function(MultiButton,

ColorModel){
	
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
	
	
