
define(['app/game', 'app/components/container', 'app/components/buttons/menubutton',

'app/components/buttonbar', 'app/scenes/activity/commmodel'],

function(Game, Container, MenuButton,

ButtonBar, commModel){
	
	"use strict";
	
	var Menu  = function(options){
		options.buttonClass = MenuButton;
		options.numX = 4;
		options.numY = 1;
		options.data = [0, 1, 2, 3];
		ButtonBar.call(this, options);
	};
	
	Menu.prototype = Object.create(ButtonBar.prototype);
	Menu.prototype.constructor = Menu;
	
	return Menu;

});
	
