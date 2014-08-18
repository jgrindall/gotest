
define(['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var TickButton = function(options){
		options.asset = 'tick';
		AbstractButton.call(this, options);
	};
	
	TickButton.prototype = Object.create(AbstractButton.prototype);
	TickButton.prototype.constructor = TickButton;
	
	TickButton.WIDTH = 80;
	TickButton.HEIGHT = 80;
	
	return TickButton;
	
});

