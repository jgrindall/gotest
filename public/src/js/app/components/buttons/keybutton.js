
define('app/components/buttons/keybutton',['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var KeyButton = function(options){
		var startFrame, frame0;
		options.asset = Assets.BUTTON;
		startFrame = 18 * 4;
		frame0 = startFrame + (4 * options.data.num);
		options.frames = [frame0, frame0+1, frame0+2, frame0+3];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	KeyButton.WIDTH = 50;
	KeyButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(KeyButton, PhaserComponents.Display.AbstractButton);

	return KeyButton;
	
});
