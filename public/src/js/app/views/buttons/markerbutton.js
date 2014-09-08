
define('app/views/buttons/markerbutton',

	['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var MarkerButton = function(options){
		options.asset = Assets.MARKERBUTTON;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	PhaserComponents.Utils.extends(MarkerButton, PhaserComponents.Display.AbstractButton);

	MarkerButton.prototype.select = function(){
		this.goToFrame(2);
	};

	MarkerButton.prototype.deselect = function(){
		this.goToFrame(1);
	};

	return MarkerButton;

});









