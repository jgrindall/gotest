
define(['app/components/buttons/navbutton', 'app/components/buttons/closebutton', 'app/game',

'app/components/buttons/listbutton', 'app/components/buttons/okbutton', 'app/components/buttons/dirbutton',

'app/components/buttons/resetbutton', 'app/scenes/activity/selectormenu',

'app/components/container', 'app/components/abstractpopup', 'app/scenes/activity/screendataprovider',

'app/components/pager', 'app/scenes/activity/commmodel'

],

function(NavButton, CloseButton, Game,

ListButton, OkButton, DirButton, 

ResetButton, SelectorMenu,

Container, AbstractPopup, ScreenDataProvider,

Pager, commModel

){
	
	"use strict";
		
	var ArrowSelectorMenu = function(options){
		SelectorMenu.call(this, options);
	};
	
	ArrowSelectorMenu.prototype = Object.create(SelectorMenu.prototype);
	ArrowSelectorMenu.prototype.constructor = ArrowSelectorMenu;
	
	ArrowSelectorMenu.prototype.addNavigation = function () {
		if(this.options.dataProvider.getNumPages() >= 2){
			this.leftButton = new DirButton({"data":{"num":3, "visible":true}, "bounds":{'x':20, 'y':Game.cy()}});
			this.leftButton.mouseUpSignal.add(this.leftClicked, this);
			this.rightButton = new DirButton({"data":{"num":5, "visible":true}, "bounds":{'x':Game.w() - 60, 'y':Game.cy()}});
			this.rightButton.mouseUpSignal.add(this.rightClicked, this);
			this.group.add(this.leftButton.sprite);
			this.group.add(this.rightButton.sprite);
			this.leftButton.disableInput();
		}
	};
	
	ArrowSelectorMenu.prototype.addUI = function () {
		var options = $.extend({}, this.options, {'bgasset':'panel'});
		this.pager = new Pager(options);
		this.pager.pageSignal.add(this.choose, this);
		this.group.add(this.pager.group);
	};
	
	ArrowSelectorMenu.prototype.enableButtons = function () {
		if(this.leftButton){
			if(this.selectedIndex>=1){
				this.leftButton.enableInput();
			}
			else{
				this.leftButton.disableInput();
			}
		}
		if(this.rightButton){
			if(this.selectedIndex <= this.pager.numPages() - 2){
				this.rightButton.enableInput();
			}
			else{
				this.rightButton.disableInput();
			}
		}
	};
	
	ArrowSelectorMenu.prototype.choose = function (data) {
		this.selectedIndex = data.pageNum;
		this.enableButtons();
	};
	
	ArrowSelectorMenu.prototype.leftClicked = function () {
		this.pager.prev();
	};
	
	ArrowSelectorMenu.prototype.rightClicked = function () {
		this.pager.next();
	};
	
	ArrowSelectorMenu.prototype.destroy = function () {
		this.pager.pageSignal.removeAll(this);
		this.pager.destroy();
		if(this.leftButton){
			this.leftButton.destroy();
			this.leftButton = null;
		}
		if(this.rightButton){
			this.rightButton.destroy();
			this.rightButton = null;
		}
		this.pager = null;
		SelectorMenu.prototype.destroy.call(this);
	};

	return ArrowSelectorMenu;
	
});


