
define('app/components/buttons/markerbutton',

	['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var MarkerButton = function(options){
		options.asset = Assets.MARKERBUTTON;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	MarkerButton.prototype = Object.create(PhaserComponents.Display.AbstractButton.prototype);
	MarkerButton.prototype.constructor = MarkerButton;

	MarkerButton.prototype.select = function(){
		this.goToFrame(2);
	};

	MarkerButton.prototype.deselect = function(){
		this.goToFrame(1);
	};

	return MarkerButton;

});









