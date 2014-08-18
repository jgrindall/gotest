
define(['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var ControlButton = function(options){
		AbstractButton.call(this, options);
	};
	
	ControlButton.HEIGHT = 120;
	ControlButton.WIDTH = 120;
	
	ControlButton.prototype = Object.create(AbstractButton.prototype);
	ControlButton.prototype.constructor = ControlButton;


	ControlButton.prototype.create = function(){
		AbstractButton.prototype.create.apply(this, arguments);
	};

	return ControlButton;
	
});

