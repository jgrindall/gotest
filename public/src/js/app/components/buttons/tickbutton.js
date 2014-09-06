
define('app/components/buttons/tickbutton',['phasercomponents'], function(PhaserComponents){
	
	"use strict";
	
	var TickButton = function(options){
		options.asset = Assets.TICKBUTTON;
		PhaserComponents.Display.AbstractButton.call(this, this.game, options);
	};
	
	TickButton.prototype = Object.create(PhaserComponents.Display.AbstractButton.prototype);
	TickButton.prototype.constructor = TickButton;
	
	TickButton.WIDTH = 80;
	TickButton.HEIGHT = 80;
	
	return TickButton;
	
});

