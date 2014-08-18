
define(['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var CloseButton = function(options){
		options.asset = 'close';
		AbstractButton.call(this, options);
	};
	
	CloseButton.prototype = Object.create(AbstractButton.prototype);
	CloseButton.prototype.constructor = CloseButton;

	return CloseButton;
	
});

