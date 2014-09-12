
define('app/views/buttons/markerbutton',

	['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var MarkerButton = function(options){
		options.asset = Assets.MARKER;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	MarkerButton.WIDTH = 40;
	MarkerButton.HEIGHT = 40;

	PhaserComponents.Utils.extends(MarkerButton, PhaserComponents.Display.AbstractButton);

	MarkerButton.prototype.select = function(){
		this.goToFrame(2);
	};

	MarkerButton.prototype.deselect = function(){
		this.goToFrame(1);
	};

	return MarkerButton;

});









