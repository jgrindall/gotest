
define(['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var LevelsButton = function(options){
		AbstractButton.call(this, options);
	};

	LevelsButton.prototype = Object.create(AbstractButton.prototype);
	LevelsButton.prototype.constructor = LevelsButton;
	
	LevelsButton.WIDTH = 150;
	LevelsButton.HEIGHT = 150;
	
	return LevelsButton;

});


