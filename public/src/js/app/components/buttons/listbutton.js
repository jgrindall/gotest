
define(['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var ListButton = function(options){
		options.asset = 'list';
		AbstractButton.call(this, options);
	};

	ListButton.prototype = Object.create(AbstractButton.prototype);
	ListButton.prototype.constructor = ListButton;
	
	ListButton.WIDTH = 120;
	ListButton.HEIGHT = 120;
	
	return ListButton;

});









