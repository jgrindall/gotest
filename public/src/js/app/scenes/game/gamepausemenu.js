
define(['app/components/buttons/navbutton', 'app/components/buttons/closebutton', 'app/game',

'app/components/buttons/listbutton', 'app/components/buttons/homebutton', 'app/components/buttons/resetbutton',

'app/components/container', 'app/components/abstractpopup'],

function(NavButton, CloseButton, Game,

ListButton, HomeButton, ResetButton,

Container, AbstractPopup){
	
	"use strict";
		
	var GamePauseMenu = function(options){
		options.bgasset = 'panel';
		AbstractPopup.call(this, options);
	};
	
	GamePauseMenu.WIDTH = 800;
	GamePauseMenu.HEIGHT = 600;
	
	GamePauseMenu.prototype = Object.create(AbstractPopup.prototype);
	GamePauseMenu.prototype.constructor = GamePauseMenu;
	
	GamePauseMenu.prototype.addButtons = function () {
		AbstractPopup.prototype.addButtons.call(this);
		this.addButton(NavButton, 	'middle', 0, 5);
		this.addButton(NavButton, 	'middle', 1, 5);
		this.addButton(ListButton, 	'middle', 2, 5);
		this.addButton(HomeButton, 	'middle', 3, 5);
		this.addButton(ResetButton, 'middle', 4, 5);
		this.addCloseButton();
	};
	
	return GamePauseMenu;
	
});

