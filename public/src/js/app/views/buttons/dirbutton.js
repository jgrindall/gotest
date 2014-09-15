
define(['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var DirButton = function(options){
		var frame0;
		options.asset = Assets.ARROWS;
		frame0 = 4 * options.data.num;
		if(options.data.turn && options.data.num === 3){
			frame0 = 4 * 9;
		}
		else if(options.data.turn && options.data.num === 5){
			frame0 = 4 * 10;
		}
		options.frames = [frame0, frame0 + 1, frame0 + 2, frame0 + 3];
		PhaserComponents.Display.AbstractButton.call(this, options);
		this.sprite.visible = options.data.visible;
	};
	
	DirButton.WIDTH = 50;
	DirButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(DirButton, PhaserComponents.Display.AbstractButton);

	return DirButton;
	
});

