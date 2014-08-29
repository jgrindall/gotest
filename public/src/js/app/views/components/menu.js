
define(['app/components/buttons/menubutton',

'app/components/buttongrid/buttonbar'],

function(MenuButton,

ButtonBar){
	
	"use strict";
	
	var Menu  = function(options){
		options.buttonClass = MenuButton;
		options.numX = 4;
		options.numY = 1;
		options.data = [{'num':0}, {'num':1}, {'num':2}, {'num':3}];
		ButtonBar.call(this, options);
	};
	
	Menu.prototype = Object.create(ButtonBar.prototype);
	Menu.prototype.constructor = Menu;
	
	return Menu;

});
	
