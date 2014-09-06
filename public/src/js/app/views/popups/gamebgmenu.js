
define('app/views/popups/gamebgmenu',

	['app/views/components/arrowselectormenu', 'phasercomponents'

],

function(

ArrowSelectorMenu, PhaserComponents

){
	
	"use strict";
		
	var GameBgMenu = function(options){
		ArrowSelectorMenu.call(this, options);
	};
	
	GameBgMenu.WIDTH = 800;
	GameBgMenu.HEIGHT = 600;
	
	PhaserComponents.Utils.extends(GameBgMenu, ArrowSelectorMenu);

	return GameBgMenu;
	
});



