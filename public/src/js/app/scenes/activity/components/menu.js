
define(['app/components/buttons/menubutton',

'app/components/buttongrid/buttonbar'],

function(MenuButton,

ButtonBar){
	
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
	
