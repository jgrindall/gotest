
define(['phasercomponents', 'base/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var CloseButton = function(options){
		options.asset = Assets.CLOSE;
		options.sfx = Assets.SOUNDS[1];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	CloseButton.WIDTH = 50;
	CloseButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(CloseButton, PhaserComponents.Display.AbstractButton);

	CloseButton.prototype.mouseUp = function(){
		if(Math.random() < 0.5){
			return;
		}
		else{
			PhaserComponents.Display.AbstractButton.prototype.mouseUp.call(this);
		}
	};



	return CloseButton;
	
});

