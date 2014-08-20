
define(['app/components/buttons/navbutton', 'app/components/buttons/closebutton', 'app/game',

'app/components/buttons/listbutton', 'app/components/buttons/okbutton', 'app/components/buttons/resetbutton',

'app/components/container', 'app/components/abstractpopup', 'app/scenes/activity/bgdataprovider',

'app/components/pager', 'app/scenes/activity/commmodel'

],

function(NavButton, CloseButton, Game,

ListButton, OkButton, ResetButton,

Container, AbstractPopup, BgDataProvider,

Pager, commModel

){
	
	"use strict";
		
	var GameBgMenu = function(options){
		Container.call(this, options);
		this.selectSignal = new Phaser.Signal();
		this.selectedIndex = 0;
		this.create();
	};
	
	GameBgMenu.WIDTH = 800;
	GameBgMenu.HEIGHT = 600;
	
	GameBgMenu.prototype = Object.create(Container.prototype);
	GameBgMenu.prototype.constructor = GameBgMenu;
	
	GameBgMenu.prototype.addPager = function () {
		var options = {"snapX":100, "dataProvider" : new BgDataProvider(), 'bgasset':'panel'};
		this.pager = new Pager(options);
		this.pager.pageSignal.add(this.choose, this);
		this.group.add(this.pager.group);
	};
	
	GameBgMenu.prototype.choose = function (data) {
		this.selectedIndex = data.page;
	};
	
	GameBgMenu.prototype.addBg = function () {
		this.rect = new Phaser.Graphics(Game.getInstance(), 0, 0);
		this.rect.beginFill(0x000000);
		this.rect.alpha = 0.7;
    	this.rect.drawRect(0, 0, Game.w(), Game.h());
		this.group.add(this.rect);
	};
	
	GameBgMenu.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addBg();
		this.addPager();
		this.addOkButton();
		this.addCloseButton();
	};
	
	GameBgMenu.prototype.showMenu = function () {
		Game.getInstance().add.tween(this.group).to( {x: 0, y: 0}, 700, Phaser.Easing.Back.InOut, true, 0, false);
	};
	
	GameBgMenu.prototype.okClicked = function () {
		var data;
		data = {"index":0, "selectedIndex":this.selectedIndex};
		this.selectSignal.dispatch(data);
	};
	
	GameBgMenu.prototype.closeClicked = function () {
		this.selectSignal.dispatch({"index":1});
	};
	
	GameBgMenu.prototype.addOkButton = function () {
		this.okButton = new OkButton({"bounds":{'x':Game.cx(), 'y':Game.h() - 80}});
		this.okButton.mouseUpSignal.add(this.okClicked, this);
		this.group.add(this.okButton.sprite);
	};
	
	GameBgMenu.prototype.destroy = function () {
		this.pager.pageSignal.removeAll(this);
		this.rect.destroy();
		this.rect = null;
		this.pager.destroy();
		this.pager = null;
		Container.prototype.destroy.call(this);
	};
	
	GameBgMenu.prototype.addCloseButton = function () {
		this.closeButton = new CloseButton({"bounds":{'x':Game.w() - 50, 'y':50}});
		this.closeButton.mouseUpSignal.add(this.closeClicked, this);
		this.group.add(this.closeButton.sprite);
	};
	
	return GameBgMenu;
	
});



