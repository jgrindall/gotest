
define('app/components/buttons/menubutton',[ 'phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var MenuButton = function(options){
		var startFrame, frame0;
		options.asset = Assets.BUTTON;
		startFrame = 9 * 4;
		frame0 = startFrame + (4 * options.data.num);
		options.frames = [frame0, frame0+1, frame0+2, frame0+3];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};
	
	MenuButton.WIDTH = 50;
	MenuButton.HEIGHT = 50;
	
	MenuButton.prototype = Object.create(PhaserComponents.Display.AbstractButton.prototype);
	MenuButton.prototype.constructor = MenuButton;

	return MenuButton;
	
});
