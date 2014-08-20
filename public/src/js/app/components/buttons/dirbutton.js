
define(['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var DirButton = function(options){
		options.asset = 'dirbutton' + options.data;
		AbstractButton.call(this, options);
	};
	
	DirButton.WIDTH = 52;
	DirButton.HEIGHT = 52;
	
	DirButton.prototype = Object.create(AbstractButton.prototype);
	DirButton.prototype.constructor = DirButton;

	return DirButton;
	
});

