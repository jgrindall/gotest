
define(['app/components/buttons/navbutton', 'app/components/buttons/closebutton', 'app/game',

'app/components/buttons/listbutton', 'app/components/buttons/homebutton', 'app/components/buttons/resetbutton',

'app/components/container', 'app/components/abstractpopup'],

function(NavButton, CloseButton, Game,

ListButton, HomeButton, ResetButton,

Container, AbstractPopup){
	
	"use strict";
		
	var GameOverMenu = function(options){
		options.bgasset = 'panelsmall';
		AbstractPopup.call(this, options);
	};
	
	GameOverMenu.WIDTH = 600;
	GameOverMenu.HEIGHT = 400;
	
	GameOverMenu.prototype = Object.create(AbstractPopup.prototype);
	GameOverMenu.prototype.constructor = GameOverMenu;
	
	GameOverMenu.prototype.addButtons = function () {
		AbstractPopup.prototype.addButtons.call(this);
		this.addButton(ResetButton, 'middle', 0, 2);
	};
	
	return GameOverMenu;
	
});

