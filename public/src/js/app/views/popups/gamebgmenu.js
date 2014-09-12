
define(

	['app/views/components/arrowselectormenu', 'phasercomponents'

],

function(

ArrowSelectorMenu, PhaserComponents

){
	
	"use strict";
		
	var GameBgMenu = function(options){
		ArrowSelectorMenu.call(this, options);
	};
	
	GameBgMenu.WIDTH = 720;
	GameBgMenu.HEIGHT = 540;
	
	PhaserComponents.Utils.extends(GameBgMenu, ArrowSelectorMenu);

	return GameBgMenu;
	
});



