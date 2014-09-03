
define('app/components/buttons/controlmenubutton',['app/game','phasercomponents'],

	function(Game, PhaserComponents){
	
	"use strict";
	
	var ControlMenuButton = function(options){
		var startFrame, frame0;
		options.asset = 'button';
		startFrame = 9 * 4;
		frame0 = startFrame + (4 * options.data.num);
		options.frames = [frame0, frame0 + 1, frame0 + 2, frame0 + 3];
		PhaserComponents.AbstractButton.call(this, Game.getInstance(), options);
	};
	
	ControlMenuButton.WIDTH = 50;
	ControlMenuButton.HEIGHT = 50;
	
	ControlMenuButton.prototype = Object.create(PhaserComponents.AbstractButton.prototype);
	ControlMenuButton.prototype.constructor = ControlMenuButton;

	return ControlMenuButton;
	
});
