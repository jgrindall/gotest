
define('app/components/buttons/keybutton',['phasercomponents'], function(PhaserComponents){
	
	"use strict";
	
	var KeyButton = function(options){
		var startFrame, frame0;
		options.asset = 'button';
		startFrame = 18 * 4;
		frame0 = startFrame + (4 * options.data.num);
		options.frames = [frame0, frame0+1, frame0+2, frame0+3];
		PhaserComponents.AbstractButton.call(this, options);
	};
	
	KeyButton.WIDTH = 50;
	KeyButton.HEIGHT = 50;
	
	KeyButton.prototype = Object.create(PhaserComponents.AbstractButton.prototype);
	KeyButton.prototype.constructor = KeyButton;

	return KeyButton;
	
});
