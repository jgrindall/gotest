
define(['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var KeyButton = function(options){
		options.asset = 'keybutton' + (options.data + 1);
		AbstractButton.call(this, options);
	};
	
	KeyButton.WIDTH = 52;
	KeyButton.HEIGHT = 52;
	
	KeyButton.prototype = Object.create(AbstractButton.prototype);
	KeyButton.prototype.constructor = KeyButton;

	return KeyButton;
	
});

