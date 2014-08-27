
define(['jquery', 'app/components/buttons/closebutton', 'app/game',

'app/components/buttons/okbutton', 'app/components/abstractpopup',

'app/components/container'

],

function($, CloseButton, Game,

OkButton, AbstractPopup,

Container

){
	
	"use strict";
		
	var SelectorMenu = function(options){
		options.bgasset = 'panel';
		AbstractPopup.call(this, options);
	};
	
	SelectorMenu.WIDTH = 800;
	SelectorMenu.HEIGHT = 600;
	
	SelectorMenu.prototype = Object.create(AbstractPopup.prototype);
	SelectorMenu.prototype.constructor = SelectorMenu;
	
	SelectorMenu.prototype.create = function () {
		AbstractPopup.prototype.create.call(this);
		this.addUI();
		this.addNavigation();
		this.addCloseButton();
		this.addOkButton();
	};
	
	SelectorMenu.prototype.addUI = function () {
		
	};
	
	SelectorMenu.prototype.addNavigation = function () {
		
	};
	
	SelectorMenu.prototype.showMe = function () {
		Game.getInstance().add.tween(this.group).to( {'x': 0, 'y': 0}, 700, Phaser.Easing.Back.InOut, true, 0, false);
	};
	
	SelectorMenu.prototype.addOkButton = function () {
		var middle = this.bounds.x + this.bounds.w/2 - (OkButton.WIDTH/2);
		var bounds = {"x":middle, "y":this.bounds.y + this.bounds.h/2 - OkButton.HEIGHT/2};
		this.addButton(OkButton, bounds);
	};
	
	SelectorMenu.prototype.destroy = function () {
		AbstractPopup.prototype.destroy.call(this);
	};
	
	SelectorMenu.prototype.addCloseButton = function () {
		var bounds = {"x":this.bounds.x + this.bounds.w - 50, "y":this.bounds.y + 10};
		this.addButton(CloseButton, bounds);
	};
	
	return SelectorMenu;
	
});



