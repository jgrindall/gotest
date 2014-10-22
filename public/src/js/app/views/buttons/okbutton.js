
define(['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var OkButton = function(options){
		options.asset = Assets.OK_BUTTON;
		options.sfx = Assets.SOUNDS[1];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	OkButton.WIDTH = 180;
	OkButton.HEIGHT = 100;
	
	PhaserComponents.Utils.extends(OkButton, PhaserComponents.Display.AbstractButton);

	OkButton.prototype.create = function(){
		PhaserComponents.Display.AbstractButton.prototype.create.call(this);
	};

	return OkButton;
	
});

