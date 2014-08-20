
define(['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var MenuButton = function(options){
		options.asset = 'menubutton';
		AbstractButton.call(this, options);
	};
	
	MenuButton.WIDTH = 52;
	MenuButton.HEIGHT = 52;
	
	MenuButton.prototype = Object.create(AbstractButton.prototype);
	MenuButton.prototype.constructor = MenuButton;

	return MenuButton;
	
});

