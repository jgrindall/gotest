
define('app/views/buttons/tickbutton',['phasercomponents'], function(PhaserComponents){
	
	"use strict";
	
	var TickButton = function(options){
		options.asset = Assets.TICKBUTTON;
		PhaserComponents.Display.AbstractButton.call(this, this.game, options);
	};
	
	PhaserComponents.Utils.extends(TickButton, PhaserComponents.Display.AbstractButton);

	TickButton.WIDTH = 80;
	TickButton.HEIGHT = 80;
	
	return TickButton;
	
});

