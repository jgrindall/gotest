
define(['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var MarkerButton = function(options){
		options.asset = 'marker';
		AbstractButton.call(this, options);
	};

	MarkerButton.prototype = Object.create(AbstractButton.prototype);
	MarkerButton.prototype.constructor = MarkerButton;

	MarkerButton.prototype.select = function(){
		this.goToFrame(2);
	};

	MarkerButton.prototype.deselect = function(){
		this.goToFrame(1);
	};

	return MarkerButton;

});









