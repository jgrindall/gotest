
define(['app/components/buttons/navbutton', 'app/components/buttons/closebutton', 'app/game',

'app/components/buttons/listbutton', 'app/components/buttons/okbutton', 'app/components/buttons/dirbutton',

'app/components/buttons/resetbutton',

'app/components/container', 'app/components/abstractpopup',

'app/components/pager', 'app/scenes/activity/commmodel'

],

function(NavButton, CloseButton, Game,

ListButton, OkButton, DirButton, 

ResetButton,

Container, AbstractPopup,

Pager, commModel

){
	
	"use strict";
		
	var SelectorMenu = function(options){
		Container.call(this, options);
		this.selectSignal = new Phaser.Signal();
	};
	
	SelectorMenu.WIDTH = 800;
	SelectorMenu.HEIGHT = 600;
	
	SelectorMenu.prototype = Object.create(Container.prototype);
	SelectorMenu.prototype.constructor = SelectorMenu;
	
	SelectorMenu.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addUI();
		this.addOkButton();
		this.addCloseButton();
		this.addNavigation();
	};
	
	SelectorMenu.prototype.addUI = function () {
		
	};
	
	SelectorMenu.prototype.addNavigation = function () {
		
	};
	
	SelectorMenu.prototype.showMenu = function () {
		Game.getInstance().add.tween(this.group).to( {x: 0, y: 0}, 700, Phaser.Easing.Back.InOut, true, 0, false);
	};
	
	SelectorMenu.prototype.okClicked = function () {
		var data = {"index":0, "selectedIndex":this.selectedIndex};
		this.selectSignal.dispatch(data);
	};
	
	SelectorMenu.prototype.closeClicked = function () {
		this.selectSignal.dispatch({"index":1});
	};
	
	SelectorMenu.prototype.addOkButton = function () {
		this.okButton = new OkButton({"bounds":{'x':Game.cx(), 'y':Game.h() - 80}});
		this.okButton.mouseUpSignal.add(this.okClicked, this);
		this.group.add(this.okButton.sprite);
	};
	
	SelectorMenu.prototype.destroy = function () {
		this.okButton.destroy();
		this.okButton = null;
		this.closeButton.destroy();
		this.closeButton = null;
		Container.prototype.destroy.call(this);
	};
	
	SelectorMenu.prototype.addCloseButton = function () {
		var bounds = {'x':Game.w()/2 + SelectorMenu.WIDTH/2 - 50, 'y':20 + (Game.h() -  SelectorMenu.HEIGHT)/2};
		this.closeButton = new CloseButton({"bounds":bounds});
		this.closeButton.mouseUpSignal.add(this.closeClicked, this);
		this.group.add(this.closeButton.sprite);
	};
	
	return SelectorMenu;
	
});



