
define('app/components/buttons/markerbutton',

	['phasercomponents', ],

	function(PhaserComponents){
	
	"use strict";
	
	var MarkerButton = function(options){
		options.asset = 'marker';
		PhaserComponents.AbstractButton.call(this, options);
	};

	MarkerButton.prototype = Object.create(PhaserComponents.AbstractButton.prototype);
	MarkerButton.prototype.constructor = MarkerButton;

	MarkerButton.prototype.select = function(){
		this.goToFrame(2);
	};

	MarkerButton.prototype.deselect = function(){
		this.goToFrame(1);
	};

	return MarkerButton;

});









