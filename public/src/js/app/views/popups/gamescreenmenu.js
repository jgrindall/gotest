
define('app/views/popups/gamescreenmenu',['app/dataproviders/screendataprovider',

'app/views/components/arrowselectormenu'

],

function(ScreenDataProvider,

ArrowSelectorMenu

){
	
	"use strict";
	
	var GameScreenMenu = function(options){
		options.dataProvider = new ScreenDataProvider();
		ArrowSelectorMenu.call(this, options);
		if(options.data){
			this.gotoPage(options.data.page);
			this.setSelected(options.data.index);
		}
	};
	
	GameScreenMenu.WIDTH = 800;
	GameScreenMenu.HEIGHT = 600;
	
	GameScreenMenu.prototype = Object.create(ArrowSelectorMenu.prototype);
	GameScreenMenu.prototype.constructor = GameScreenMenu;
	
	return GameScreenMenu;
	
});


