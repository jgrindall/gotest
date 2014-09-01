
define('app/components/buttons/okbutton',['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var OkButton = function(options){
		options.asset = 'okbutton';
		AbstractButton.call(this, options);
	};
	
	OkButton.WIDTH = 250;
	OkButton.HEIGHT = 75;
	
	OkButton.prototype = Object.create(AbstractButton.prototype);
	OkButton.prototype.constructor = OkButton;

	return OkButton;
	
});

