
define('app/components/buttons/menubutton',['app/game', 'phasercomponents'],

	function(Game, PhaserComponents){
	
	"use strict";
	
	var MenuButton = function(options){
		var startFrame, frame0;
		options.asset = 'button';
		startFrame = 9 * 4;
		frame0 = startFrame + (4 * options.data.num);
		options.frames = [frame0, frame0+1, frame0+2, frame0+3];
		PhaserComponents.AbstractButton.call(this, Game.getInstance(), options);
	};
	
	MenuButton.WIDTH = 50;
	MenuButton.HEIGHT = 50;
	
	MenuButton.prototype = Object.create(PhaserComponents.AbstractButton.prototype);
	MenuButton.prototype.constructor = MenuButton;

	return MenuButton;
	
});
