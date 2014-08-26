
define(['jquery', 'app/components/buttons/navbutton', 'app/components/buttons/closebutton', 'app/game',

'app/components/buttons/listbutton', 'app/components/buttons/okbutton', 'app/components/buttons/resetbutton',

'app/components/buttons/dirbutton',

'app/components/container', 'app/components/abstractpopup', 'app/scenes/activity/bgdataprovider',

'app/components/pager', 'app/scenes/activity/commmodel'

],

function($, NavButton, CloseButton, Game,

ListButton, OkButton, ResetButton,

DirButton,

Container, AbstractPopup, BgDataProvider,

Pager, commModel

){
	
	"use strict";
		
	var PagingMenu = function(options){
		Container.call(this, options);
		this.selectSignal = new Phaser.Signal();
		this.selectedIndex = 0;
	};
	
	PagingMenu.WIDTH = 800;
	PagingMenu.HEIGHT = 600;
	
	PagingMenu.prototype = Object.create(Container.prototype);
	PagingMenu.prototype.constructor = PagingMenu;
	
	PagingMenu.prototype.addPager = function () {
		var options = $.extend({}, this.options, {"dataProvider" : this.options.dataProvider, 'bgasset':'panel'});
		this.pager = new Pager(options);
		this.pager.pageSignal.add(this.choose, this);
		this.group.add(this.pager.group);
	};
	
	PagingMenu.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addPager();
		this.addOkButton();
		this.addCloseButton();
		this.addLRButtons();
	};
	
	PagingMenu.prototype.choose = function (data) {
		this.selectedIndex = data.pageNum;
		this.enableButtons();
	};
	
	PagingMenu.prototype.enableButtons = function () {
		if(this.selectedIndex>=1){
			this.leftButton.enableInput();
		}
		else{
			this.leftButton.disableInput();
		}
		if(this.selectedIndex <= this.pager.numPages() - 2){
			this.rightButton.enableInput();
		}
		else{
			this.rightButton.disableInput();
		}
	};
	
	PagingMenu.prototype.addLRButtons = function () {
		this.leftButton = new DirButton({"data":{"num":3, "visible":true}, "bounds":{'x':20, 'y':Game.cy()}});
		this.leftButton.mouseUpSignal.add(this.leftClicked, this);
		this.rightButton = new DirButton({"data":{"num":5, "visible":true}, "bounds":{'x':Game.w() - 60, 'y':Game.cy()}});
		this.rightButton.mouseUpSignal.add(this.rightClicked, this);
		this.group.add(this.leftButton.sprite);
		this.group.add(this.rightButton.sprite);
		this.leftButton.disableInput();
	};
	
	PagingMenu.prototype.leftClicked = function () {
		this.pager.prev();
	};
	
	PagingMenu.prototype.rightClicked = function () {
		this.pager.next();
	};
	
	PagingMenu.prototype.showMenu = function () {
		Game.getInstance().add.tween(this.group).to( {x: 0, y: 0}, 700, Phaser.Easing.Back.InOut, true, 0, false);
	};
	
	PagingMenu.prototype.okClicked = function () {
		var data;
		data = {"index":1, "selectedIndex":this.selectedIndex};
		this.selectSignal.dispatch(data);
	};
	
	PagingMenu.prototype.closeClicked = function () {
		this.selectSignal.dispatch({"index":0});
	};
	
	PagingMenu.prototype.addOkButton = function () {
		var bounds = {'x':Game.w() - OkButton.WIDTH - 10, 'y':Game.h() - 80};
		this.okButton = new OkButton({"bounds":bounds});
		this.okButton.mouseUpSignal.add(this.okClicked, this);
		this.group.add(this.okButton.sprite);
	};
	
	PagingMenu.prototype.destroy = function () {
		this.pager.pageSignal.removeAll(this);
		this.pager.destroy();
		this.okButton.destroy();
		this.okButton = null;
		this.pager = null;
		if(this.leftButton){
			this.leftButton.destroy();
		}
		if(this.rightButton){
			this.rightButton.destroy();
		}
		this.closeButton.destroy();
		Container.prototype.destroy.call(this);
	};
	
	PagingMenu.prototype.addCloseButton = function () {
		var bounds = {'x':Game.w()/2 + PagingMenu.WIDTH/2 - 50, 'y':20 + (Game.h() -  PagingMenu.HEIGHT)/2};
		this.closeButton = new CloseButton({"bounds":bounds});
		this.closeButton.mouseUpSignal.add(this.closeClicked, this);
		this.group.add(this.closeButton.sprite);
	};
	
	return PagingMenu;
	
});



