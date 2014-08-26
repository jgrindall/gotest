
define(['app/components/buttons/navbutton', 'app/components/buttons/closebutton', 'app/game',

'app/components/buttons/listbutton', 'app/components/buttons/okbutton', 'app/components/buttons/dirbutton',

'app/components/buttons/resetbutton', 'app/scenes/activity/selectormenu',

'app/components/container', 'app/components/abstractpopup', 'app/scenes/activity/screendataprovider',

'app/components/pager', 'app/scenes/activity/commmodel', 'app/scenes/activity/arrowselectormenu'

],

function(NavButton, CloseButton, Game,

ListButton, OkButton, DirButton, 

ResetButton, SelectorMenu,

Container, AbstractPopup, ScreenDataProvider,

Pager, commModel, ArrowSelectorMenu

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



