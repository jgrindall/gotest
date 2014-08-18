
define(['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var PauseButton = function(options){
		options.asset = 'pause';
		AbstractButton.call(this, options);
	};
	
	PauseButton.prototype = Object.create(AbstractButton.prototype);
	PauseButton.prototype.constructor = PauseButton;
	
	PauseButton.WIDTH = 120;
	PauseButton.HEIGHT = 120;
	
	return PauseButton;
	
});

