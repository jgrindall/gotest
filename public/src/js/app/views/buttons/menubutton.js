
define(['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var MenuButton = function(options){
		var frame0;
		options.asset = Assets.BUTTON;
		options.disabledAlpha = 1;
		options.sfx = Assets.SOUNDS[0];
		frame0 = (4 * options.data.num);
		options.frames = [frame0, frame0 + 1, frame0 + 2, frame0 + 3];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	MenuButton.WIDTH = 50;
	MenuButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(MenuButton, PhaserComponents.Display.AbstractButton);

	return MenuButton;
	
});
