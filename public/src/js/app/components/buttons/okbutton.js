
define('app/components/buttons/okbutton',[ 'phasercomponents'],

	function(PhaserComponents){
	
	"use strict";
	
	var OkButton = function(options){
		options.asset = 'okbutton';
		PhaserComponents.AbstractButton.call(this, options);
	};
	
	OkButton.WIDTH = 250;
	OkButton.HEIGHT = 75;
	
	OkButton.prototype = Object.create(PhaserComponents.AbstractButton.prototype);
	OkButton.prototype.constructor = OkButton;

	return OkButton;
	
});

