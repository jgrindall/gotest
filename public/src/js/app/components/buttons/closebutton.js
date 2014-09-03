
define('app/components/buttons/closebutton',['app/game', 'phasercomponents'],

	function(Game, PhaserComponents){
	
	"use strict";
	
	var CloseButton = function(options){
		options.asset = 'close';
		PhaserComponents.AbstractButton.call(this, Game.getInstance(), options);
	};
	
	CloseButton.WIDTH = 50;
	CloseButton.HEIGHT = 50;
	
	CloseButton.prototype = Object.create(PhaserComponents.AbstractButton.prototype);
	CloseButton.prototype.constructor = CloseButton;

	return CloseButton;
	
});

