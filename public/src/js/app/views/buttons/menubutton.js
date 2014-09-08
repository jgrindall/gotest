
define('app/views/buttons/menubutton',[ 'phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var MenuButton = function(options){
		var startFrame, frame0;
		options.asset = Assets.BUTTON;
		options.buttonClickSound = Assets.SOUNDS[0];
		startFrame = 9 * 4;
		frame0 = startFrame + (4 * options.data.num);
		options.frames = [frame0, frame0+1, frame0+2, frame0+3];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	MenuButton.WIDTH = 50;
	MenuButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(MenuButton, PhaserComponents.Display.AbstractButton);

	return MenuButton;
	
});
