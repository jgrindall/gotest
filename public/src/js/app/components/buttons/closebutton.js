
define('app/components/buttons/closebutton',['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var CloseButton = function(options){
		options.asset = 'close';
		AbstractButton.call(this, options);
	};
	
	CloseButton.WIDTH = 50;
	CloseButton.HEIGHT = 50;
	
	CloseButton.prototype = Object.create(AbstractButton.prototype);
	CloseButton.prototype.constructor = CloseButton;

	return CloseButton;
	
});

