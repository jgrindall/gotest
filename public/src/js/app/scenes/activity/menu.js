
define(['app/game', 'app/components/container',

'app/components/buttonbar'],

function(Game, Container,

ButtonBar){
	
	"use strict";
	
	var Menu  = function(options){
		ButtonBar.call(this, options);
	};
	
	Menu.prototype = Object.create(ButtonBar.prototype);
	Menu.prototype.constructor = Menu;
	
	return Menu;

});
	
