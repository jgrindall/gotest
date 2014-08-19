
define(['app/components/buttons/navbutton', 'app/components/buttons/closebutton', 'app/game',

'app/components/buttons/listbutton', 'app/components/buttons/okbutton', 'app/components/buttons/resetbutton',

'app/components/container', 'app/components/abstractpopup', 'app/scenes/activity/screendataprovider',

'app/components/pager'

],

function(NavButton, CloseButton, Game,

ListButton, OkButton, ResetButton,

Container, AbstractPopup, ScreenDataProvider,

Pager

){
	
	"use strict";
		
	var GameScreenMenu = function(options){
		Container.call(this, options);
		this.selectSignal = new Phaser.Signal();
		this.create();
	};
	
	GameScreenMenu.WIDTH = 800;
	GameScreenMenu.HEIGHT = 600;
	
	GameScreenMenu.prototype = Object.create(Container.prototype);
	GameScreenMenu.prototype.constructor = GameScreenMenu;
	
	GameScreenMenu.prototype.addPager = function () {
		var options = {"snapX":100, "dataProvider" : new ScreenDataProvider()};
		this.pager = new Pager(options);
		this.group.add(this.pager.group);
	};
	
	GameScreenMenu.prototype.addBg = function () {
		this.rect = new Phaser.Graphics(Game.getInstance(), 0, 0);
		this.rect.beginFill(0x000000);
		this.rect.alpha = 0.7;
    	this.rect.drawRect(0, 0, Game.w(), Game.h());
		this.group.add(this.rect);
	};
	
	GameScreenMenu.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addBg();
		this.addPager();
		this.addOkButton();
		this.addCloseButton();
	};
	
	GameScreenMenu.prototype.showMenu = function () {
		Game.getInstance().add.tween(this.group).to( {x: 0, y: 0}, 700, Phaser.Easing.Back.InOut, true, 0, false);
	};
	
	GameScreenMenu.prototype.okClicked = function () {
		this.selectSignal.dispatch({"index":0});
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
		this.rect.destroy();
		this.rect = null;
		this.pager.destroy();
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



