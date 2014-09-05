
define('app/components/buttons/tickbutton',['phasercomponents'], function(PhaserComponents){
	
	"use strict";
	
	var TickButton = function(options){
		options.asset = Assets.TICKBUTTON;
		PhaserComponents.AbstractButton.call(this, this.game, options);
	};
	
	TickButton.prototype = Object.create(PhaserComponents.AbstractButton.prototype);
	TickButton.prototype.constructor = TickButton;
	
	TickButton.WIDTH = 80;
	TickButton.HEIGHT = 80;
	
	return TickButton;
	
});

