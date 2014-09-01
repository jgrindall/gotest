
define('app/views/popups/gamebgmenu',['app/views/components/arrowselectormenu',

'app/dataproviders/bgdataprovider'

],

function(

ArrowSelectorMenu,

BgDataProvider

){
	
	"use strict";
		
	var GameBgMenu = function(options){
		options.dataProvider = new BgDataProvider();
		ArrowSelectorMenu.call(this, options);
	};
	
	GameBgMenu.WIDTH = 800;
	GameBgMenu.HEIGHT = 600;
	
	GameBgMenu.prototype = Object.create(ArrowSelectorMenu.prototype);
	GameBgMenu.prototype.constructor = GameBgMenu;
	
	return GameBgMenu;
	
});



