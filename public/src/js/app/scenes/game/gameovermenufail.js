
define(['app/components/buttons/listbutton', 'app/scenes/game/gameovermenu'],

function(ListButton, GameOverMenu){
	
	"use strict";
		
	var GameOverMenuSuccess = function(options){
		GameOverMenu.call(this, options);
	};
	
	GameOverMenuSuccess.WIDTH = GameOverMenu.WIDTH;
	GameOverMenuSuccess.HEIGHT = GameOverMenu.HEIGHT;
	
	GameOverMenuSuccess.prototype = Object.create(GameOverMenu.prototype);
	GameOverMenuSuccess.prototype.constructor = GameOverMenuSuccess;
	
	GameOverMenuSuccess.prototype.addButtons = function () {
		GameOverMenu.prototype.addButtons.call(this);
		this.addButton(ListButton, 	'middle', 1, 2);
		this.buttons[1].disableInput();
	};
	
	return GameOverMenuSuccess;
	
});


