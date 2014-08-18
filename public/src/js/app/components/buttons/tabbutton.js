
define(['app/components/buttons/abstractbutton'],function(AbstractButton){
	
	"use strict";
	
	var TabButton = function(options){
		var num = options.num || '0';
		options.asset = 'tabbutton' + num;
		AbstractButton.call(this, options);
	};
	
	TabButton.WIDTH = 244;
	TabButton.HEIGHT = 52;
	
	TabButton.prototype = Object.create(AbstractButton.prototype);
	TabButton.prototype.constructor = TabButton;
	
	return TabButton;

});







