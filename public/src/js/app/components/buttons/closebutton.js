
define('app/components/buttons/closebutton',[ 'phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var CloseButton = function(options){
		options.asset = Assets.CLOSE;
		PhaserComponents.AbstractButton.call(this, options);
	};
	
	CloseButton.WIDTH = 50;
	CloseButton.HEIGHT = 50;
	
	CloseButton.prototype = Object.create(PhaserComponents.AbstractButton.prototype);
	CloseButton.prototype.constructor = CloseButton;

	return CloseButton;
	
});

