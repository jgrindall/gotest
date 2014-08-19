
define(['app/components/buttons/navbutton', 'app/scenes/game/gameovermenu'],

function(NavButton, GameOverMenu){
	
	"use strict";
		
	var GameOverMenuFail = function(options){
		GameOverMenu.call(this, options);
	};
	
	GameOverMenuFail.WIDTH = GameOverMenu.WIDTH;
	GameOverMenuFail.HEIGHT = GameOverMenu.HEIGHT;
	
	GameOverMenuFail.prototype = Object.create(GameOverMenu.prototype);
	GameOverMenuFail.prototype.constructor = GameOverMenuFail;
	
	GameOverMenuFail.prototype.addButtons = function () {
		GameOverMenu.prototype.addButtons.call(this);
		this.addButton(NavButton, 	'middle', 1, 2);
	};
	
	return GameOverMenuFail;
	
});
