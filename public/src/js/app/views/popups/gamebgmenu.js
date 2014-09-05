
define('app/views/popups/gamebgmenu',['app/views/components/arrowselectormenu'

],

function(

ArrowSelectorMenu

){
	
	"use strict";
		
	var GameBgMenu = function(options){
		ArrowSelectorMenu.call(this, options);
	};
	
	GameBgMenu.WIDTH = 800;
	GameBgMenu.HEIGHT = 600;
	
	GameBgMenu.prototype = Object.create(ArrowSelectorMenu.prototype);
	GameBgMenu.prototype.constructor = GameBgMenu;
	
	return GameBgMenu;
	
});



