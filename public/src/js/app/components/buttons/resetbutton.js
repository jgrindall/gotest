
define(['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var ResetButton = function(options){
		options.asset = 'reset';
		AbstractButton.call(this, options);
	};
	
	ResetButton.WIDTH = 120;
	ResetButton.HEIGHT = 120;
	
	ResetButton.prototype = Object.create(AbstractButton.prototype);
	ResetButton.prototype.constructor = ResetButton;

	return ResetButton;
	
});

