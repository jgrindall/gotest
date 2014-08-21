
define(['app/components/buttons/navbutton', 'app/components/buttons/closebutton', 'app/game',

'app/components/buttons/listbutton', 'app/components/buttons/okbutton', 'app/components/buttons/dirbutton',

'app/components/buttons/resetbutton',

'app/components/container', 'app/components/abstractpopup', 'app/scenes/activity/screendataprovider',

'app/components/pager', 'app/scenes/activity/commmodel'

],

function(NavButton, CloseButton, Game,

ListButton, OkButton, DirButton, 

ResetButton,

Container, AbstractPopup, ScreenDataProvider,

Pager, commModel

){
	
	"use strict";
		
	var GameScreenMenu = function(options){
		this.selectedIndex = 0;
		Container.call(this, options);
		this.selectSignal = new Phaser.Signal();
	};
	
	GameScreenMenu.WIDTH = 800;
	GameScreenMenu.HEIGHT = 600;
	
	GameScreenMenu.prototype = Object.create(Container.prototype);
	GameScreenMenu.prototype.constructor = GameScreenMenu;
	
	GameScreenMenu.prototype.addPager = function () {
		var options = {"snapX":100, "dataProvider" : new ScreenDataProvider(), 'bgasset':'panel'};
		this.pager = new Pager(options);
		this.pager.selectSignal.add(this.choose, this);
		this.group.add(this.pager.group);
	};
	
	GameScreenMenu.prototype.choose = function (data) {
		this.selectedIndex = data.index;
	};
	
	GameScreenMenu.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addPager();
		this.addOkButton();
		this.addCloseButton();
	};

	
	GameScreenMenu.prototype.showMenu = function () {
		Game.getInstance().add.tween(this.group).to( {x: 0, y: 0}, 700, Phaser.Easing.Back.InOut, true, 0, false);
	};
	
	GameScreenMenu.prototype.okClicked = function () {
		var data;
		data = {"index":0, "selectedIndex":this.selectedIndex};
		this.selectSignal.dispatch(data);
	};
	
	GameScreenMenu.prototype.closeClicked = function () {
		this.selectSignal.dispatch({"index":1});
	};
	
	GameScreenMenu.prototype.addOkButton = function () {
		this.okButton = new OkButton({"bounds":{'x':Game.cx(), 'y':Game.h() - 80}});
		this.okButton.mouseUpSignal.add(this.okClicked, this);
		this.group.add(this.okButton.sprite);
	};
	
	GameScreenMenu.prototype.destroy = function () {
		this.pager.destroy();
		this.okButton.destroy();
		this.okButton = null;
		this.pager = null;
		Container.prototype.destroy.call(this);
	};
	
	GameScreenMenu.prototype.addCloseButton = function () {
		this.closeButton = new CloseButton({"bounds":{'x':Game.w() - 50, 'y':50}});
		this.closeButton.mouseUpSignal.add(this.closeClicked, this);
		this.group.add(this.closeButton.sprite);
	};
	
	return GameScreenMenu;
	
});



