
define(['app/components/buttons/navbutton', 'app/components/buttons/closebutton', 'app/game',

'app/components/buttons/listbutton', 'app/components/buttons/okbutton', 'app/components/buttons/resetbutton',

'app/components/buttons/dirbutton', 'app/scenes/activity/arrowselectormenu',

'app/components/container', 'app/components/abstractpopup', 'app/scenes/activity/bgdataprovider',

'app/components/pager', 'app/scenes/activity/commmodel'

],

function(NavButton, CloseButton, Game,

ListButton, OkButton, ResetButton,

DirButton, ArrowSelectorMenu,

Container, AbstractPopup, BgDataProvider,

Pager, commModel

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



